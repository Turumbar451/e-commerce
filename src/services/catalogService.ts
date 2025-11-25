import api from '@/lib/axios';

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  type?: string;
}

export const getBrands = async (): Promise<IBrand[]> => {
  const { data } = await api.get<IBrand[]>('/products/brands');
  return data;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const { data } = await api.get<ICategory[]>('/products/categories');
  return data;
};
