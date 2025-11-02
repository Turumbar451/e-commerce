import { createContext, type PropsWithChildren } from 'react';

interface Props {
  algo: string;
}

const GlobalContextValue = createContext({} as Props);

const GlobalContext = ({ children }: PropsWithChildren) => {
  return (
    <GlobalContextValue value={{ algo: 'sdjafs' }}>
      {children}
    </GlobalContextValue>
  );
};

export default GlobalContext;
