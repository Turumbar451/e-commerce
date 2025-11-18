import { useQuery } from '@tanstack/react-query';
import { getInventoryStats } from '@/services/inventoryService';
import type { InventoryStats } from '@/services/inventoryService';

//valor inicial mientras carga
const initialStats: InventoryStats = {
    totalItems: 0,
    onSaleCount: 0,
    lowStockCount: 0,
    noStockCount: 0,
};

//?este hook obtiene los kpis (estadisticas de las cards)
export const useAdminInventoryStats = () => {

    const { data, isLoading, isError, error } = useQuery<InventoryStats, Error>({
        queryKey: ['adminInventoryStats'],
        queryFn: getInventoryStats,
    });

    return {
        stats: data || initialStats, // devolver data inicial mientras carga
        isLoadingStats: isLoading,
        isErrorStats: isError,
        errorStats: error,
    };
};