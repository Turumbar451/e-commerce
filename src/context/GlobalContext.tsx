import type { User } from '@/interfaces/auth';
import { createContext, useState, type PropsWithChildren } from 'react';

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
    authStatus: 'not-authenticated', // Estado inicial
    user: null,
  });

  const login = (user: User) => {
    setAuth({
      authStatus: 'authenticated',
      user: user,
    });
  };

  const logout = () => {
    setAuth({
      authStatus: 'not-authenticated',
      user: null,
    });
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
