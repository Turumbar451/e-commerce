import { toast } from 'sonner';
import { useNavigate } from 'react-router';

/* custom hook para mostrar que debes iniciar sesion */
export const useLoginPrompt = () => {
    const navigate = useNavigate();

    const showLoginPrompt = (message: string) => {
        toast.warning(message, {
            description: "Necesitas una cuenta para usar esta función.",
            position: "bottom-right",
            action: {
                label: "Iniciar Sesión",
                onClick: () => navigate('/login'),
            },
        });
    };

    return { showLoginPrompt };
};