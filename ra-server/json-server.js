import dotenv from"dotenv";
dotenv.config();
import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.JSON_SERVER_PORT;

server.use(middlewares);
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

server.use(router);
server.listen(port, () => {
    console.log(`JSON server is running at port ${port}`);
})