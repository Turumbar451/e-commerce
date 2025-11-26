import { useEffect, useState, type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import type { User } from '@/interfaces/auth';
import { checkAuthStatus, logoutUser } from '@/services/authServices';
import { GlobalContext } from './GlobalContext'; // importa desde el archivo separado

type statusOption = 'checking' | 'authenticated' | 'not-authenticated';
type user = User | null;

interface AuthState {
  authStatus: statusOption;
  user: user;
}

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthState>({
    authStatus: 'checking',
    user: null,
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await checkAuthStatus();
        setAuth({ authStatus: 'authenticated', user: user });
      } catch (error) {
        setAuth({ authStatus: 'not-authenticated', user: null });
        console.log(error);
      }
    };
    checkSession();
  }, []);

  const login = (user: User) => {
    setAuth({
      authStatus: 'authenticated',
      user: user,
    });
  };

  const logout = async () => {
    try {
      await logoutUser();
      setAuth({ authStatus: 'not-authenticated', user: null });
    } catch (error) {
      toast.error('Error al cerrar sesión');
      console.log(error);
    }
  };

  return (
    <GlobalContext
      value={{
        authStatus: auth.authStatus,
        user: auth.user,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext>
  );
};
