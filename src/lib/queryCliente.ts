import { QueryClient } from '@tanstack/react-query';

// aqui podriamos configurar opciones globales de cache
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos de cache
            refetchOnWindowFocus: false, //  previene refetch al cambiar de pestaña
        },
    },
});