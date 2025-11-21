import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/firebase/config';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { loginWithGoogle, checkAuthStatus} from '@/services/authServices';
import type { User } from '@/interfaces/auth';
import type { AxiosError } from 'axios';

export const useGoogleAuth = () => {
  const { login } = useContext(GlobalContext);

  const mutation = useMutation({
  mutationFn: async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    await loginWithGoogle(idToken);      // backend crea cookie
    const fullUser = await checkAuthStatus(); // <- usuario completo
    return fullUser;
  },
  onSuccess: (user) => {
    login(user);                         // ahora sí tiene role
    toast.success(`¡Bienvenido, ${user.nombre}!`);
  },
    onError: (error: unknown) => {
      const axiosErr = error as AxiosError<{ error?: string }>;
      const msg = axiosErr?.response?.data?.error || 'Error al iniciar sesión con Google';
      console.error('Error en login con Google:', error);
      toast.error(msg);
    }
  });

  return {
    signInWithGoogle: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error
  };
};
