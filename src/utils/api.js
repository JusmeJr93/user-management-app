import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:5000/api'
    baseURL: 'https://user-manager-b0edaffe40c2.herokuapp.com/api'
});

//attaching token to each request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default api;