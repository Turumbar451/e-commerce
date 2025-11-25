import { createContext } from 'react';
import type { User } from '@/interfaces/auth';

type statusOption = 'checking' | 'authenticated' | 'not-authenticated';
type user = User | null;

interface AuthContextProps {
  authStatus: statusOption;
  user: user;
  login: (user: User) => void;
  logout: () => void;
}

export const GlobalContext = createContext({} as AuthContextProps);
