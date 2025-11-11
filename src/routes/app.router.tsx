import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
//en este archivo definiremos las rutas que tendranuestra aplicacion
import { createBrowserRouter, Navigate } from 'react-router';
import { PrivateRouter } from './PrivateRouter';
import CartPage from '@/pages/CartPage';
import FavoritesPage from '@/pages/FavoritesPage';
import ProfilePage from '@/pages/ProfilePage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';

export const appRouter = createBrowserRouter([
  {
    path: '/admin/users',
    element: <PrivateRouter element={<AdminDashboardPage />} />, //<AdminUsersPage />
  },
  {
    path: '/admin/inventory',
    element: <PrivateRouter element={<AdminDashboardPage />} />, //<AdminInventoryPage />
  },

  //cajero
  {
    path: '/pos',
    element: <PrivateRouter element={<AdminDashboardPage />} />, //<PosPage />
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/cart',
    element: <PrivateRouter element={<CartPage />} />,
  },
  {
    path: '/favorites',
    element: <PrivateRouter element={<FavoritesPage />} />,
  },
  {
    path: '/profile',
    element: <PrivateRouter element={<ProfilePage />} />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
