import api from '@/lib/axios';
import type { IEmployee } from '@/interfaces/adminUser';

export const getInternalUsers = async (): Promise<IEmployee[]> => {
    const { data } = await api.get<IEmployee[]>('/admin/users');
    return data;
};

export interface UpdateUserPayload {
    nombre: string;
    apellido: string;
    email: string;
    role: string;
    password?: string;
}

export const updateInternalUser = async (id: string, data: UpdateUserPayload) => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
};