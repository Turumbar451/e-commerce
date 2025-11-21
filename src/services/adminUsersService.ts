import api from '@/lib/axios';
import type { IEmployee } from '@/interfaces/adminUser';

export const getInternalUsers = async (): Promise<IEmployee[]> => {
    const { data } = await api.get<IEmployee[]>('/admin/users');
    return data;
};


