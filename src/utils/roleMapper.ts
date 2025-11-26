import { ROLES, type FrontendRole } from '@/lib/constants';

//type BackendRole = 'user' | 'cajero' | 'admon_inventario' | 'admon_roles';

export const mapRoleToFrontend = (backendRole: string): FrontendRole => {
    switch (backendRole) {
        case 'user':
        case 'cliente': // Por si acaso
            return ROLES.CUSTOMER;
        case 'cajero':
            return ROLES.CASHIER;
        case 'admon_inventario':
            return ROLES.INVENTORY_MANAGER;
        case 'admon_roles':
            return ROLES.ROLE_MANAGER;
        default:
            console.warn(`Rol desconocido recibido: ${backendRole}, asignando CUSTOMER`);
            return ROLES.CUSTOMER; // Fallback seguro
    }
};

export const mapRoleToBackend = (frontendRole: FrontendRole): string => {
    switch (frontendRole) {
        case ROLES.CUSTOMER: return 'user';
        case ROLES.CASHIER: return 'cajero';
        case ROLES.INVENTORY_MANAGER: return 'admon_inventario';
        case ROLES.ROLE_MANAGER: return 'admon_roles';
        default: return 'user';
    }
};