import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteProductService, deleteSizeService } from '@/services/inventoryService';

//! este hook es para eliminaciones en general, añadir logica despues
export const useDelete = () => {
    const queryClient = useQueryClient();

    // eliminar producto completo
    const deleteProductMutation = useMutation({
        mutationFn: deleteProductService,
        onSuccess: () => {
            toast.success('Producto eliminado del catálogo');
            // invalidar listas
            queryClient.invalidateQueries({ queryKey: ['adminProducts'] }); // tabla del admin
            queryClient.invalidateQueries({ queryKey: ['products'] });      //  grid del cliente
            queryClient.invalidateQueries({ queryKey: ['adminInventoryStats'] }); //  KPIs
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Error al eliminar el producto');
        },
    });

    //eliminar talla especifica
    const deleteSizeMutation = useMutation({
        mutationFn: ({ sku, size }: { sku: string; size: string }) => deleteSizeService(sku, size),
        onSuccess: () => {
            toast.success('Talla eliminada del inventario');
            // refrestcar tablas y estadistcas
            queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
            queryClient.invalidateQueries({ queryKey: ['adminInventoryStats'] });
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Error al eliminar la talla');
        },
    });

    return {
        // estados
        isDeletingProduct: deleteProductMutation.isPending,
        isDeletingSize: deleteSizeMutation.isPending,
        // acciones
        deleteProduct: deleteProductMutation.mutate,
        deleteSize: (sku: string, size: string) => deleteSizeMutation.mutate({ sku, size }),
    };
};