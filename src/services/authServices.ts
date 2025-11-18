import type { LoginPayload, RegisterPayload, User } from '@/interfaces/auth';
import api from '@/lib/axios';
//_id y role en vez de id y role.nombre

interface SecurityQuestionPayload {
    questionId: string;
    answer: string;
}

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

// Google Sign-In: enviar idToken (Firebase) al backend y recibir el usuario
export const loginWithGoogle = async (idToken: string): Promise<User> => {
    const { data } = await api.post<User>('/auth/google', { idToken });
    return data;
};

// Preguntas de seguridad -----------------------------------------------------
export const setupSecurityQuestions = async (questions: SecurityQuestionPayload[]) => {
    await api.post('/auth/security/setup', { questions });
};

export const getSecurityQuestions = async (email: string) => {
    const { data } = await api.get('/auth/security/questions', { params: { email } });
    return data;
};

export const verifySecurityAnswers = async (
    email: string,
    answers: SecurityQuestionPayload[],
) => {
    const { data } = await api.post('/auth/security/verify', { email, answers });
    return data;
};

export const getSecurityCatalog = async (): Promise<Array<{ id: string; label: string }>> => {
    const { data } = await api.get('/auth/security/catalog');
    // Se espera que el backend responda { catalog: [{ id, label }, ...] }
    return data?.catalog || [];
};

export const resetPasswordWithToken = async (payload: ResetPasswordPayload) => {
    await api.post('/auth/security/reset-password', payload);
};