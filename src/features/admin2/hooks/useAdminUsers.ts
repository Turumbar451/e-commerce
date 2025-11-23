import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getInternalUsers } from '@/services/adminUsersService';

export type SortConfig = {
    key: 'nombre' | 'fecha_alta';
    direction: 'asc' | 'desc';
};

//tipos para el filtro de roles
export type RoleFilter = 'todos' | 'admon_roles' | 'admon_inventario' | 'cajero';

export const useAdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<RoleFilter>('todos');

    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'fecha_alta',
        direction: 'desc',
    });

    const {
        data: employees,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['internalUsers'],
        queryFn: getInternalUsers,
    });

    const processedEmployees = (() => {
        if (!employees) return [];

        let result = employees;

        // filtro por texto
        if (searchTerm.trim()) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter((emp) => {
                const nombreCompleto = `${emp.nombre} ${emp.apellido}`.toLowerCase();
                const email = emp.email?.toLowerCase() || '';
                return nombreCompleto.includes(lowerTerm) || email.includes(lowerTerm);
            });
        }

        if (roleFilter !== 'todos') {
            result = result.filter((emp) => emp.role === roleFilter);
        }

        // ordenamiento
        return [...result].sort((a, b) => {
            const { key, direction } = sortConfig;
            let comparison = 0;

            if (key === 'nombre') {
                const nameA = `${a.nombre} ${a.apellido}`.toLowerCase();
                const nameB = `${b.nombre} ${b.apellido}`.toLowerCase();
                comparison = nameA.localeCompare(nameB);
            } else if (key === 'fecha_alta') {
                const dateA = new Date(a.fecha_alta).getTime();
                const dateB = new Date(b.fecha_alta).getTime();
                comparison = dateA - dateB;
            }

            return direction === 'asc' ? comparison : -comparison;
        });
    })();

    const handleSort = (key: 'nombre' | 'fecha_alta') => {
        setSortConfig((current) => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    return {
        employees: processedEmployees,
        isLoading,
        isError,
        refetch,
        searchTerm,

        setSearchTerm,
        sortConfig,
        handleSort,
        roleFilter,
        setRoleFilter,
    };
};