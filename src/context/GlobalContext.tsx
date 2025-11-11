import type { User } from '@/interfaces/auth';
import { checkAuthStatus, logoutUser } from '@/services/authServices';
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { toast } from 'sonner';

type statusOption = 'checking' | 'authenticated' | 'not-authenticated';
type user = User | null;

interface AuthState {
  authStatus: statusOption;
  user: user;
}

//lo que el contexto provee
interface AuthContextProps {
  authStatus: statusOption;
  user: user;
  login: (user: User) => void;
  logout: () => void;
}

export const GlobalContext = createContext({} as AuthContextProps);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthState>({
    authStatus: 'checking', // Estado inicial
    user: null,
  });

  // verificar la sesión al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        // llama a /api/auth/me (que usa la cookie)
        const user = await checkAuthStatus();
        setAuth({ authStatus: 'authenticated', user: user });
      } catch (error) {
        setAuth({ authStatus: 'not-authenticated', user: null });
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
      await logoutUser(); // Llama a /api/auth/logout
      setAuth({ authStatus: 'not-authenticated', user: null });
    } catch (error) {
      toast.error('Error al cerrar sesión');
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
