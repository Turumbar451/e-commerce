import { GlobalContext } from '@/context/GlobalContext';
import { useContext, type JSX } from 'react';
import { Navigate } from 'react-router';

interface Props {
  element: JSX.Element;
}

export const PrivateRouter = ({ element }: Props) => {
  const { authStatus } = useContext(GlobalContext);

  // comprobando...
  if (authStatus === 'checking') {
    return <div>Loading...</div>; // o un spinner
  }

  // dejarlo pasar si esta autenticado
  if (authStatus === 'authenticated') {
    return element;
  }

  //sino, redireccionar al login
  return <Navigate to="/login" replace />;
};
