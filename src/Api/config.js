import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BACK_URL || 'http://localhost:8888/';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const userAPI = {
    getAllUsers: () => api.get('/utilisateurs'),
    getUser: (id) => api.get(`/utilisateurs/${id}`),
    createUser: (utilisateurs) => api.post('/utilisateurs', utilisateurs),
    updateUser: (id, utilisateurs) => api.put(`/utilisateurs/${id}`, utilisateurs),
    deleteUser: (id) => api.delete(`/utilisateurs/${id}`),
};

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData), // Ajout de /api/ si nécessaire
    login: (credentials) => api.post('/auth/login', credentials), // Ajout de /api/ si nécessaire
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

export default api;
