// 1. AGREGA: Dispatch y SetStateAction aquí arriba 👇
import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { User } from '@/interfaces/auth';

type statusOption = 'checking' | 'authenticated' | 'not-authenticated';
type user = User | null;

interface AuthContextProps {
  authStatus: statusOption;
  user: user;
  login: (user: User) => void;
  logout: () => void;
  
  // 2. AGREGA: Esta línea para que TypeScript reconozca la función 👇
  setUser: Dispatch<SetStateAction<user>>;
}

export const GlobalContext = createContext({} as AuthContextProps);