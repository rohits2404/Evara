import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE,
    timeout: 60000, // 60s for AI responses
    headers: { "Content-Type": "application/json" },
});

// Response interceptor for unified error handling
api.interceptors.response.use((res) => res.data, (err) => {
    const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        (err.code === "ECONNABORTED" ? "Request timed out. Please try again." : err.message) ||
        "Something went wrong";
    return Promise.reject(new Error(message));
});

export const proposalAPI = {
    create: (userQuery) => api.post("/proposals", { userQuery }),
    getAll: (page = 1, limit = 10) =>
        api.get("/proposals", { params: { page, limit } }),
    getById: (id) => api.get(`/proposals/${id}`),
    delete: (id) => api.delete(`/proposals/${id}`),
    getStats: () => api.get("/proposals/stats"),
};

export default api;
