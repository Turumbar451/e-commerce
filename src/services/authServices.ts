import type { LoginPayload, RegisterPayload, User } from '@/interfaces/auth';
import api from '@/lib/axios';

export const registerUser = async (userData: RegisterPayload) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
};

export const loginUser = async (credentials: LoginPayload): Promise<User> => {
    // obtener token
    const { data } = await api.post<{ token: string }>('/auth/login', credentials);

    // guardar token
    localStorage.setItem('authToken', data.token);

    // obtener datos del usuario
    try {
        // El interceptor añadirá el token que acabamos de guardar
        const user = await checkAuthStatus();
        return user;
    } catch (error) {
        // Si /me falla, limpiamos
        localStorage.removeItem('authToken');
        throw new Error("Falló la obtención de datos de usuario post-login.");
    }
};

export const checkAuthStatus = async (): Promise<User> => {
    // El interceptor añadira el token si existe en localStorage
    const { data } = await api.get<User>('/auth/me');
    return data;
};

export const logoutUser = async () => {
    localStorage.removeItem('authToken');
    // El interceptor se encargará de NO enviar el header 'Authorization'
    // en la próxima petición porque el token ya no existe.
    //  llamar al endpoint de logout (si invalida el token en el backend)
    // await api.delete('/auth/logout'); 
};