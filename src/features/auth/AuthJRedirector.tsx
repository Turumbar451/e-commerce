//este componente se encargara de redirigir cuando se inicie sesion.
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { GlobalContext } from '@/context/GlobalContext';

export const AuthRedirector = () => {
  const { authStatus, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus !== 'authenticated' || !user) {
      return;
    }

    switch (user.role) {
      case 'admon_roles':
        navigate('/admin/users');
        break;
      case 'admon_inventario':
        navigate('/admin/inventory');
        break;
      case 'cajero':
        navigate('/pos');
        break;
      case 'cliente':
      default:
        navigate('/');
    }
  }, [authStatus, user, navigate]);

  return null;
};
