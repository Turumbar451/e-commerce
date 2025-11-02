import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
//en este archivo definiremos las rutas que tendranuestra aplicacion
import { createBrowserRouter, Navigate } from 'react-router';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
