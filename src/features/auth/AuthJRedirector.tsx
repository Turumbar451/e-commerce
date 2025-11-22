//este componente se encargara de redirigir cuando se inicie sesion.
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { GlobalContext } from '@/context/GlobalContext';
import { shouldSetupSecurity } from '@/utils/security';

export const AuthRedirector = () => {
  const { authStatus, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus !== 'authenticated' || !user) {
      return;
    }

    if (shouldSetupSecurity(user)) {
      navigate('/security-setup');
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
  case 'user':
    break;
  default:
    // Antes:
    // navigate('/');
    // Después: NO hagas nada, ya estás en login/register
    break;
}
  }, [authStatus, user, navigate]);

  return null;
};
