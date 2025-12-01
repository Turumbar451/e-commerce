import { GlobalContext } from '@/context/GlobalContext';
import { useContext, type JSX } from 'react';
import { Navigate } from 'react-router';
import { FullPageLoader } from '@/components/common/FullPageLoader';

interface Props {
  element: JSX.Element;
}

export const ProtectedAuthRoute = ({ element }: Props) => {
  const { authStatus } = useContext(GlobalContext);

  if (authStatus === 'checking') {
    return <FullPageLoader />;
  }

  if (authStatus !== 'authenticated') {
    return <Navigate to="/login" replace />;
  }

  return element;
};
