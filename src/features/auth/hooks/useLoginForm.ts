import { useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GlobalContext } from '@/context/GlobalContext';
import type { LoginPayload } from '@/interfaces/auth';
import { checkAuthStatus, loginUser } from '@/services/authServices';

export const useLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useContext(GlobalContext);

    const mutation = useMutation({
        // 1) hace POST /auth/login y el backend pone la cookie
        mutationFn: (credentials: LoginPayload) => loginUser(credentials),

        // 2) si login fue exitoso, pedimos el usuario completo a /auth/me
        onSuccess: async () => {
            const fullUser = await checkAuthStatus();   // <- aquí sí viene { id, email, role, nombre, ... }

            login(fullUser);                            // guardamos el usuario REAL en el contexto
            toast.success(`¡Bienvenido, ${fullUser.nombre}!`);
        },

        onError: (err: any) => {
            const errorMessage = err.response?.data?.error || 'Credenciales inválidas.';
            setError(errorMessage);
            toast.error(errorMessage);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        mutation.mutate({ email, password }); //llama a la mutacion
    };

    return {
        email, setEmail,
        password, setPassword,
        error,
        isLoading: mutation.isPending, //esto se activa en true cuando la mutacion esta en curso
        handleSubmit,
    };
};