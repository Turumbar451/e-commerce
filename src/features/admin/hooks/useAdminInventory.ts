import { useMemo } from 'react';
import { useAdminProducts } from './useAdminProducts';
import type {
    IProductDetail,
    IProductVariant,
    IProductSize,
} from '@/interfaces/product';
import type { InventoryItem } from '../components/ProductDataTable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adjustProductStock } from '@/services/inventoryService';
import { toast } from 'sonner';


export const useAdminInventory = () => {
    const queryClient = useQueryClient();

    const {
        products,
        pagination,
        isLoading: isLoadingTable,
        isError: isErrorTable,
        page,
        setPage,
    } = useAdminProducts();

    const stockMutation = useMutation({
        mutationFn: ({ sku, size, adjustment }: { sku: string; size: string; adjustment: number }) =>
            adjustProductStock(sku, size, adjustment),
        onSuccess: () => {
            toast.success('Stock actualizado');
            // invalidar para recargar tabla y estadisticas
            queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
            queryClient.invalidateQueries({ queryKey: ['adminInventoryStats'] });
        },
        onError: () => {
            toast.error('No se pudo ajustar el stock (¿Insuficiente?)');
        },
    });

    const handleAdjustStock = (sku: string, size: string, adjustment: number) => {
        stockMutation.mutate({ sku, size, adjustment });
    };

    const inventoryItems: InventoryItem[] = useMemo(() => {
        return products.flatMap((product: IProductDetail) =>
            product.variants.flatMap((variant: IProductVariant) =>
                variant.sizes.map((size: IProductSize) => ({
                    id: `${product._id}-${variant.sku}-${size.size}`,
                    name: product.name,
                    variantName: variant.colorName,
                    sku: variant.sku,
                    size: size.size,
                    stock: size.stock,
                    price: product.salePrice || product.price,
                    imageUrl: variant.images[0] || '/placeholder-shoe.jpg',
                    status:
                        size.stock === 0
                            ? 'Agotado'
                            : size.stock < 10
                                ? 'Bajo'
                                : 'Óptimo',
                }))
            )
        );
    }, [products]);




    const handlePrevPage = () => {
        //math.max devuelve el numero mas grande (4,1) devuelve 4
        setPage((prev: number) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        if (pagination && page < pagination.totalPages) {
            setPage((prev: number) => prev + 1);
        }
    };

    return {
        pagination,
        page,
        setPage,

        handlePrevPage,
        handleNextPage,

        handleAdjustStock,
        isAdjusting: stockMutation.isPending,

        inventoryItems,
        isLoadingTable,
        isErrorTable,

    };
};