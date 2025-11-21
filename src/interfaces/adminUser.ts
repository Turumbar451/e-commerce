export interface IEmployee {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    role: 'cajero' | 'admon_inventario' | 'admon_roles';
    fecha_alta: string; // un string ISO desde el backend
    activo: boolean;
}