import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

/* //interceptar peticion, antes de cada get, post, put...
api.interceptors.request.use(
    (config) => {
        //leer siempre el token en cada peticion
        const token = localStorage.getItem('authToken');

        // añade a los headers de la petición
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config; // devolver config (con o sin el token)
    },
    (error) => {
        //error en la configuracion de la peticion
        return Promise.reject(error);
    }
);
 */
export default api;