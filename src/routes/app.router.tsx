import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
//en este archivo definiremos las rutas que tendranuestra aplicacion
import { createBrowserRouter, Navigate } from 'react-router';
import { PrivateRouter } from './PrivateRouter';
import CartPage from '@/pages/CartPage';
import FavoritesPage from '@/pages/FavoritesPage';
import ProfilePage from '@/pages/ProfilePage';
import { AdminLayout } from '@/layout/AdminLayout';
import { lazy } from 'react';

const PosPage = lazy(() => import('@/pages/PosPage'));
const AdminUsersPage = lazy(() => import('@/pages/AdminUsersPage'));
const AdminInventoryPage = lazy(() => import('@/pages/AdminInventoryPage'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/admin',
    element: <PrivateRouter element={<AdminLayout />} />,
    children: [
      {
        path: 'users',
        element: <AdminUsersPage />,
      },
      {
        path: 'inventory',
        element: <AdminInventoryPage />,
      },
    ],
  },

  //cajero
  {
    path: '/pos',
    element: <PrivateRouter element={<PosPage />} />,
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
