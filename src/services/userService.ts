import api from '@/lib/axios';

export interface Address {
  _id?: string;
  calle: string;
  numero_exterior: string;
  numero_interior?: string;
  colonia: string;
  municipio: string;
  estado: string;
  codigo_postal: string;
  telefono: string;
  referencias?: string;
}

export const getAddresses = async (): Promise<Address[]> => {
  const { data } = await api.get<{ direcciones: Address[] }>('/users/addresses');
  return data.direcciones;
};

export const addAddress = async (address: Address): Promise<Address> => {
  const { data } = await api.post<{ direccion: Address }>('/users/addresses', address);
  return data.direccion;
};