import { useState, use } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GlobalContext } from '@/context/GlobalContext';
import { useNavigate } from 'react-router';
import type { LoginPayload } from '@/interfaces/auth';
import { loginUser } from '@/services/authServices';

export const useLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = use(GlobalContext);

    const mutation = useMutation({
        mutationFn: (credentials: LoginPayload) => loginUser(credentials),
        onSuccess: (user) => {

            login(user);

            toast.success(`¡Bienvenido, ${user.nombre}!`);

            //redireccionar por rol
            switch (user.role) {
                // implementar logica de roles (casos)
                default:
                    navigate('/');
            }
        },
        onError: (err: any) => {
            const errorMessage = err.response?.data?.error || "Credenciales inválidas.";
            setError(errorMessage);
            toast.error(errorMessage);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        mutation.mutate({ email, password });
    };

    return {
        email, setEmail,
        password, setPassword,
        error,
        isLoading: mutation.isPending,
        handleSubmit,
    };
};