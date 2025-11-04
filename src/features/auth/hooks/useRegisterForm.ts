import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { registerUser } from '@/services/authServices';
import type { RegisterPayload } from '@/interfaces/auth';

export const useRegisterForm = () => {
    const [name, setName] = useState('');
    const [apellido, setApellido] = useState(''); // añadir
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    // usar tanstack
    const mutation = useMutation({
        mutationFn: (userData: RegisterPayload) => registerUser(userData),
        onSuccess: (data) => {
            // exito -> sonner
            toast.success(data.message || "Usuario creado. Revisa tu correo.");
            // tal vez redirigir a /login o a una pagina de "verifica email"
        },
        onError: (err: any) => {
            // mostar error de api
            const errorMessage = err.response?.data?.error || "Error al registrarse.";
            setError(errorMessage);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); //limpiar error previo

        //validar y otras validaciones
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        mutation.mutate({
            nombre: name,
            apellido: apellido || undefined, // undefined por si esta vacio
            email,
            password
        });
    };

    return {
        name, setName,
        apellido, setApellido,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error,
        isLoading: mutation.isPending,
        handleSubmit,
    };
};