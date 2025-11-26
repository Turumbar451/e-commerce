import api from '@/lib/axios';
import type { IEmployee } from '@/interfaces/adminUser';
import { mapRoleToBackend, mapRoleToFrontend } from '@/utils/roleMapper';
import type { FrontendRole } from '@/lib/constants';

export const getInternalUsers = async (): Promise<IEmployee[]> => {
    const { data } = await api.get<any[]>('/admin/users');
    return data.map(user => ({
        ...user,
        role: mapRoleToFrontend(user.role)
    }));
};
export interface UpdateUserPayload {
    nombre: string;
    apellido: string;
    email: string;
    role: string;
    password?: string;
}

export interface CreateUserPayload {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    role: FrontendRole; // Usamos el tipo en inglés
}

export const updateInternalUser = async (id: string, data: UpdateUserPayload) => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
};

export const deleteInternalUser = async (id: string) => {
    const { data } = await api.delete<{ message: string }>(`/admin/users/${id}`);
    return data;
};

export const createInternalUser = async (userData: CreateUserPayload) => {
    const payload = {
        ...userData,
        role: mapRoleToBackend(userData.role) // Traducir: 'cashier' -> 'cajero'
    };
    await api.post('/admin/users', payload);
};