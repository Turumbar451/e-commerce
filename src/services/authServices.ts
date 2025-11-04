import type { LoginPayload, RegisterPayload, User } from '@/interfaces/auth';
import api from '@/lib/axios';

export const registerUser = async (userData: RegisterPayload) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
};

export const loginUser = async (credentials: LoginPayload): Promise<User> => {
    await api.post('/auth/login', credentials);

    try {
        const user = await checkAuthStatus();
        return user;
    } catch (error) {
        throw new Error("Falló la obtención de datos de usuario post-login.");
    }
};

export const checkAuthStatus = async (): Promise<User> => {
    const { data } = await api.get<User>('/auth/me');
    return data;
};

export const logoutUser = async () => {
    await api.delete('/auth/logout');
};