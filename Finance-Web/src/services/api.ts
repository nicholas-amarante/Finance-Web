import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Endereço do seu Backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor: Antes de cada requisição, insere o Token automaticamente se ele existir
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('meu_token_jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;