import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteProductService } from '@/services/inventoryService';

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

    //! este hook es para eliminaciones en general, añadir logica despues

    return {
        // estados
        isDeletingProduct: deleteProductMutation.isPending,
        // acciones
        deleteProduct: deleteProductMutation.mutate,
    };
};