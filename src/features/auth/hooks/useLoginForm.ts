import { useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GlobalContext } from '@/context/GlobalContext';
import type { LoginPayload, User } from '@/interfaces/auth';
import { loginUser } from '@/services/authServices';

export const useLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useContext(GlobalContext);

    const mutation = useMutation({
        //matationFn es quien realiza la llamada al servicio, es una funcion asíncrona
        mutationFn: (credentials: LoginPayload) => loginUser(credentials),
        onSuccess: (user: User) => { //si todo sale bien
            login(user);
            toast.success(`¡Bienvenido, ${user.nombre}!`);
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