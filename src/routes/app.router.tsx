import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { createBrowserRouter, Navigate } from 'react-router';
import CartPage from '@/pages/CartPage';
import FavoritesPage from '@/pages/FavoritesPage';
import ProfilePage from '@/pages/ProfilePage';
import { AdminLayout } from '@/layout/AdminLayout';
import { lazy } from 'react';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProtectedRoleRoute } from './ProtectedRoleRouter';
import ProductDetailPage from '@/pages/ProductDetailPage';
import { StoreRouteGuard } from './StoreRouteGuard';
import AdminProductFormPage from '@/pages/AdminProductFormPage';
import AdminProductsPage from '@/pages/AdminProductPage';

const PosPage = lazy(() => import('@/pages/PosPage'));
const AdminUsersPage = lazy(() => import('@/pages/AdminUsersPage'));
const AdminInventoryPage = lazy(() => import('@/pages/AdminInventoryPage'));

const ROLES = {
  ROLE_ADMIN: 'admon_roles',
  INV_ADMIN: 'admon_inventario',
  CASHIER: 'cajero',
  USER: 'cliente', //?era cliente o user?
};

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <StoreRouteGuard element={<HomePage />} />,
  },
  {
    // : indica que es parametro dinamico
    path: '/product/:productId',
    element: <StoreRouteGuard element={<ProductDetailPage />} />,
  },
  {
    path: '/admin',
    // layout para ambos admins
    element: (
      <ProtectedRoleRoute
        element={<AdminLayout />}
        allowedRoles={[ROLES.ROLE_ADMIN, ROLES.INV_ADMIN]}
      />
    ),
    children: [
      {
        path: 'products',
        element: (
          <ProtectedRoleRoute
            element={<AdminProductsPage />}
            allowedRoles={[ROLES.INV_ADMIN]} // O ambos admins
          />
        ),
      },
      {
        path: 'products/new',
        element: (
          <ProtectedRoleRoute
            element={<AdminProductFormPage />}
            allowedRoles={[ROLES.INV_ADMIN]}
          />
        ),
      },
      {
        path: 'users',
        // admin de roles
        element: (
          <ProtectedRoleRoute
            element={<AdminUsersPage />}
            allowedRoles={[ROLES.ROLE_ADMIN]}
          />
        ),
      },
      {
        path: 'inventory',
        // solo para admin de inventario
        element: (
          <ProtectedRoleRoute
            element={<AdminInventoryPage />}
            allowedRoles={[ROLES.INV_ADMIN]}
          />
        ),
      },
    ],
  },

  // rutas del cajero
  {
    path: '/pos',
    element: (
      <ProtectedRoleRoute
        element={<PosPage />}
        allowedRoles={[ROLES.CASHIER]}
      />
    ),
  },

  // rutas del cliente
  {
    path: '/cart',
    element: (
      <ProtectedRoleRoute element={<CartPage />} allowedRoles={[ROLES.USER]} />
    ),
  },
  {
    path: '/favorites',
    element: (
      <ProtectedRoleRoute
        element={<FavoritesPage />}
        allowedRoles={[ROLES.USER]}
      />
    ),
  },
  {
    path: '/profile',
    //todos los usuarios loggeados ven su perfil
    element: (
      <ProtectedRoleRoute
        element={<ProfilePage />}
        allowedRoles={[
          ROLES.USER,
          ROLES.CASHIER,
          ROLES.INV_ADMIN,
          ROLES.ROLE_ADMIN,
        ]}
      />
    ),
  },

  // rutas publicas
  {
    path: '/login',
    element: <LoginPage />,
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
