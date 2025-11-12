import { GlobalContext } from '@/context/GlobalContext';
import { useContext, type JSX } from 'react';
import { Navigate } from 'react-router';

interface Props {
  element: JSX.Element;
  //arreglo de roles permitidos
  allowedRoles: string[];
}

export const ProtectedRoleRoute = ({ element, allowedRoles }: Props) => {
  // obtener estatus y usuario
  const { authStatus, user } = useContext(GlobalContext);
  const userRole = user?.role;

  // estado inicial
  if (authStatus === 'checking') {
    return <div>Cargando...</div>; // hay que mejorar esto
  }

  if (authStatus !== 'authenticated') {
    return <Navigate to="/login" replace />;
  }

  // si esta autenticado, si existe userRole y dentro de [] existe userRole
  if (userRole && allowedRoles.includes(userRole)) {
    // entonces dejar pasar
    return element;
  }

  //autenticado pero sin rol
  return <Navigate to="/" replace />;
};
