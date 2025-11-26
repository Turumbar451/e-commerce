import { useCallback, useMemo } from 'react';
import { useAdminProducts } from './useAdminProducts';
import type {
    IProductDetail,
    IProductVariant,
    IProductSize,
} from '@/interfaces/product';
import type { InventoryItem } from '../components/ProductDataTable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adjustProductStock, type PaginatedAdminProducts } from '@/services/inventoryService';
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

        // antes de que la mutacion se ejecute, o sea antes de que el backend responda
        onMutate: async ({ sku, size, adjustment }) => {
            // cancelar cualquier consulta en curso sobre productos admin
            await queryClient.cancelQueries({ queryKey: ['adminProducts', page, 20] });

            //guardar datos previos a la mutacion por si har que revertir
            const previousData = queryClient.getQueryData(['adminProducts', page, 20]);

            // actualizar la UI de forma optimista
            queryClient.setQueryData(['adminProducts', page, 20], (old: PaginatedAdminProducts | undefined) => {
                if (!old) return old;

                // en base a old, 
                return {
                    ...old,

                    data: old.data.map((product) => ({
                        ...product,
                        variants: product.variants.map((variant) => {
                            // buscar la variante correcta
                            if (variant.sku !== sku) return variant;

                            return {
                                ...variant,
                                sizes: variant.sizes.map((s) => {
                                    // buscar la talla correcta y ajustar stock
                                    if (s.size !== size) return s;
                                    return { ...s, stock: s.stock + adjustment };
                                }),
                            };
                        }),
                    })),
                };
            });

            return { previousData }; //este objeto sera pasado como 3er argumento a onError, que se llamo context
        },

        // si hay error en el backend
        onError: (err, newVariables, context) => { //context es {previousData}
            toast.error('Error al sincronizar stock. Deshaciendo cambios...');
            console.log(newVariables, err);

            //revertir cambios guardados
            if (context?.previousData) {
                queryClient.setQueryData(['adminProducts', page, 20], context.previousData);

            }
        },

        //cuanto termine (bien o mal)
        onSettled: () => {
            // refrescar datos
            queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
            queryClient.invalidateQueries({ queryKey: ['adminInventoryStats'] });
        },
    });

    //se usa useCallback para que la funcion no cambie de referencia en cada render
    //o sea que esta funcion y la otra(la que se crea en el nuevo rerender) son la misma porque comparten el espacio en memoria
    const handleAdjustStock = useCallback((sku: string, size: string, adjustment: number) => {
        stockMutation.mutate({ sku, size, adjustment });
    }, [stockMutation.mutate]);

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

        inventoryItems,
        isLoadingTable,
        isErrorTable,

    };
};