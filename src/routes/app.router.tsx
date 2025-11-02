import { HomePage } from '@/pages/HomePage';
//en este archivo definiremos las rutas que tendranuestra aplicacion
import { createBrowserRouter, Navigate } from 'react-router';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
