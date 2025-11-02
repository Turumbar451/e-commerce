import { useState } from "react";

export const useRegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Lógica de validación
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // mas validaciones
        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        // si sale bien
        setError(null);
        console.log("Formulario válido, registrando al usuario...", {
            name,
            email,
            password,
        });
        // llamar a tanstack o algo asi
    };

    return {
        // valores
        name,
        email,
        password,
        confirmPassword,
        error,
        // metodos
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        handleSubmit,
    };
};