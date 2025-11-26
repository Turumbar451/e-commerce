export const ROLES = {
    CUSTOMER: 'customer',
    CASHIER: 'cashier',
    INVENTORY_MANAGER: 'inventory_manager',
    ROLE_MANAGER: 'role_manager',
} as const;

export type FrontendRole = typeof ROLES[keyof typeof ROLES];