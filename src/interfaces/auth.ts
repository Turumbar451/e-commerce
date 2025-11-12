//payload para el endpoint POST /api/auth/register

export interface RegisterPayload {
    email: string;
    password: string;
    nombre: string;
    apellido?: string; // Opcional, o tal vez no, aun no se 
}

//payload para el endpoint POST /api/auth/login
export interface LoginPayload {
    email: string;
    password: string;
}

//Respuesta del endpoint GET /api/auth/me
export interface User {
    _id: string;
    email: string;
    nombre: string;
    apellido: string;
    role: 'cliente' | 'cajero' | 'admon_inventario' | 'admon_roles';
    historial_compras: any[]; // esto en el futuro sera un tipo, hay que ver
}