import type { LoginPayload, RegisterPayload, User } from '@/interfaces/auth';
import api from '@/lib/axios';
//_id y role en vez de id y role.nombre

export const registerUser = async (userData: RegisterPayload) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
};

// el backend pone la cookie
export const loginUser = async (credentials: LoginPayload): Promise<User> => {
    const { data } = await api.post<User>('/auth/login', credentials);
    return data;
};


//llamar a /me con la cookie que el navegador envia
//esto verificara la sesion
export const checkAuthStatus = async (): Promise<User> => {
    const { data } = await api.get<User>('/auth/me');
    return data;
};


//   el backend se encarga de limpiar la cookie
export const logoutUser = async () => {
    await api.delete('/auth/logout');
};