import { GlobalContext } from '@/context/GlobalContext';
import { useContext, type JSX } from 'react';
import { Navigate } from 'react-router';

interface Props {
  element: JSX.Element;
}

export const ProtectedAuthRoute = ({ element }: Props) => {
  const { authStatus } = useContext(GlobalContext);

  if (authStatus === 'checking') {
    return <div>Cargando...</div>;
  }

  if (authStatus !== 'authenticated') {
    return <Navigate to="/login" replace />;
  }

  return element;
};
