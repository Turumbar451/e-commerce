//este componente se encargara de redirigir cuando se inicie sesion.
import { useContext, useEffect } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { useNavigate } from 'react-router';

export const AuthRedirector = () => {
  const { authStatus, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    // si el estado cambia a autenticado y tenemos datos del usuario...
    if (authStatus === 'authenticated' && user) {
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
    }
  }, [authStatus, user, navigate]); // se ejecuta cada que el contexto cambia

  return null;
};
