import { GlobalContext } from '@/context/GlobalContext';
import { useContext, type JSX } from 'react';
import { Navigate } from 'react-router';
import { ROLES } from '@/lib/constants';

interface Props {
  element: JSX.Element;
}

//proteger rutas de la tienda porque queremos que admins y clientes solo vean sus paneles
export const StoreRouteGuard = ({ element }: Props) => {
  const { authStatus, user } = useContext(GlobalContext);

  if (authStatus === 'checking') {
    return <div>Cargando...</div>; // cambiar a algun spinner componente
  }

  if (authStatus === 'authenticated' && user) {
    switch (user.role) {
      case ROLES.ROLE_MANAGER:
        return <Navigate to="/admin/users" replace />;
      case ROLES.INVENTORY_MANAGER:
        return <Navigate to="/admin/inventory" replace />;
      case ROLES.CASHIER:
        return <Navigate to="/pos" replace />;
      case ROLES.CUSTOMER:
      default:
        return element;
    }
  }

  //sin autenticacion es un visitante
  return element;
};
