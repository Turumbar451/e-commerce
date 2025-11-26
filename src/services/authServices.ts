import type { LoginPayload, RegisterPayload, User } from '@/interfaces/auth';
import api from '@/lib/axios';
import { mapRoleToFrontend } from '@/utils/roleMapper';
//_id y role en vez de id y role.nombre

interface ResetPasswordPayload {
    email: string;
    token: string;
    newPassword: string;
}

export const registerUser = async (userData: RegisterPayload) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
};


// el backend pone la cookie
export const loginUser = async (credentials: LoginPayload): Promise<User> => {
    const { data } = await api.post('/auth/login', credentials);

    return {
        ...data,
        role: mapRoleToFrontend(data.role)
    };
};


//llamar a /me con la cookie que el navegador envia
export const checkAuthStatus = async (): Promise<User> => {
    const { data } = await api.get('/auth/me');
    return {
        ...data,
        role: mapRoleToFrontend(data.role)
    };
};


//   el backend se encarga de limpiar la cookie
export const logoutUser = async () => {
    await api.delete('/auth/logout');
};


// Google Sign-In: enviar idToken (Firebase) al backend y recibir el usuario
export const loginWithGoogle = async (idToken: string): Promise<User> => {
    const { data } = await api.post<User>('/auth/google', { idToken });
    return data;
};

// Recuperación de contraseña por email --------------------------------------
export const requestPasswordReset = async (email: string) => {
    // El backend responde de forma genérica: siempre 200 con mensaje
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
};

export const resetPasswordWithToken = async (payload: ResetPasswordPayload) => {
    await api.post('/auth/reset-password', payload);
};

export const verifyEmailApi = async (email: string, token: string) => {
    const { data } = await api.post('/auth/verify', { email, token });
    return data;
};

// Update user profile data
export const updateUserApi = async (userData: { nombre: string; apellido: string }) => {
    const { data } = await api.put<User>('/auth/profile', userData);
    return data;
};

// Change user password
export const changePasswordApi = async (passwordData: { currentPassword: string; newPassword: string }) => {
    const { data } = await api.put('/auth/password', passwordData);
    return data;
};