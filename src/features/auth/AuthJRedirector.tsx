import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GlobalContext } from '@/context/GlobalContext';
import { ROLES } from '@/lib/constants'; // <--- 1. Importa esto

export const AuthRedirector = () => {
  const { authStatus, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus !== 'authenticated' || !user) {
      return;
    }

    // 2. Cambia los strings 'hardcodeados' por las constantes ROLES
    switch (user.role) {
      case ROLES.ROLE_MANAGER: // Antes 'admon_roles'
        navigate('/admin/users');
        break;
      case ROLES.INVENTORY_MANAGER: // Antes 'admon_inventario'
        navigate('/admin/inventory');
        break;
      case ROLES.CASHIER: // Antes 'cajero'
        navigate('/pos');
        break;
      case ROLES.CUSTOMER: // Antes 'cliente'
      default:
        navigate('/');
    }
  }, [authStatus, user, navigate]);

  return null;
};
