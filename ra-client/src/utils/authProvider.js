import axios from "axios";

const authProvider = {
    async login({ username, password }) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_SERVER_URL}/login`, {username, password});
            
            if(response.data && response.data.token) {
                return localStorage.setItem('token', response.data.token);
            } else {
                throw new Error('Login failed: No token received.');
            }
        } catch(err) {
            console.log(err);
            throw err.response?.data?.message || err.message || "Login failed"
        }
    },
    async logout() {
        localStorage.removeItem("token");
    },
    async checkError({ status }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("user");
            throw new Error("Session expired");
        }
    },
    async checkAuth() {
        if (!localStorage.getItem("token")) {
            throw new Error("Authentication required");
        }
    },
    async canAccess({resource, action, record}) {
        const token = localStorage.getItem('token');
        if(!token) return false;
        const response = await axios.get(`${import.meta.env.VITE_AUTH_SERVER_URL}/authcheck`, {headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});
        const data = response.data;

        if(data.role==="Admin") return true;
        if(resource==="projects" || resource==="clients") {
            if(data.role==="Content Strategist") {
                if(action==="list") return true;
            }
        }
        else if(resource==="contentPieces") {
            if(action==="list") {
                if(['Editor', 'Writer'].includes(data.role)) return true;
            }
            else if(action==="create") {
                if(data.role==="Writer") return true;
            } else if(action==="edit" || action==="delete") {
                if(data.role==="Writer") {
                    if(data.id===record.writerId) return true;
                } else if(data.role==="Editor") {
                    if(data.id===record.editorId) return true;
                }
            }
        }

        return false;

    }
};

export default authProvider;