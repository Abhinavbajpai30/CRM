import dotenv from"dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import axios from "axios";

const app = express();
const port = process.env.AUTH_PORT;

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.SECRET_KEY;
const JWT_EXP = '1h';

app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({message: "Username and password are required."})
    }

    const response = await axios.get(`${process.env.JSON_SERVER_URL}/users`);
    const users = response.data;

    const user = users.find((user) => user.username===username && user.password===password);

    if(!user) {
        return res.status(401).json({message: "Invalid credentials."})
    }

    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    }

    try {
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXP});
        return res.json({token});
    } catch(err) {
        console.log("Error signing JSWT:", err);
        return res.status(500).json({message: 'Something went wrong'});
    }
})

app.get('/authcheck', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        }
        if(!user) {
            return res.status(401).json({message: "Not authenticated"});
        }

        res.json({
            id: user.id,
            username: user.username,
            role: user.role
        })
    })
})

app.listen(port, () => {
    console.log(`Auth server is running at port ${port}`);
})