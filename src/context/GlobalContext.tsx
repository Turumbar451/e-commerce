import { createContext, type PropsWithChildren } from 'react';
type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

interface Props {
  authStatus: AuthStatus;
}

export const GlobalContextValue = createContext({} as Props);

const GlobalContext = ({ children }: PropsWithChildren) => {
  return (
    <GlobalContextValue value={{ authStatus: 'authenticated' }}>
      {children}
    </GlobalContextValue>
  );
};

export default GlobalContext;
