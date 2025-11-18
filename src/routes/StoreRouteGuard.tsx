import { GlobalContext } from '@/context/GlobalContext';
import { useContext, type JSX } from 'react';
import { Navigate } from 'react-router';

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
      case 'admon_roles':
        return <Navigate to="/admin/users" replace />;
      case 'admon_inventario':
        return <Navigate to="/admin/inventory" replace />;
      case 'cajero':
        return <Navigate to="/pos" replace />;
      case 'cliente':
      default:
        // si todo falla, es un cliente y pasa
        return element;
    }
  }

  //sin autenticacion es un visitante
  return element;
};
