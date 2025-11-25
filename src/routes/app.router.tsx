import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { createBrowserRouter, Navigate } from 'react-router';
import CartPage from '@/pages/CartPage';
import FavoritesPage from '@/pages/FavoritesPage';
import ProfilePage from '@/pages/ProfilePage';
import { AdminLayout } from '@/layout/AdminLayout';
import { lazy } from 'react';
import { RegisterPage } from '@/pages/RegisterPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { ProtectedRoleRoute } from './ProtectedRoleRouter';
import { ProtectedAuthRoute } from './ProtectedAuthRoute';
import ProductDetailPage from '@/pages/ProductDetailPage';
import { StoreRouteGuard } from './StoreRouteGuard';
import { Navbar } from '@/components/common/Navbar';
import VerifyPage from '@/pages/VerifyPage';
import AdminProductEditPage from '@/pages/AdminInventory/AdminProductEditPage';

const PosPage = lazy(() => import('@/pages/Cajero/PosPage'));
const AdminUsersPage = lazy(() => import('@/pages/AdminUsersPage'));
const AdminInventoryPage = lazy(
  () => import('@/pages/AdminInventory/AdminInventoryPage')
);
const AdminDashboardPage = lazy(
  () => import('@/pages/AdminInventory/AdminDashboardPage')
);
const AdminProductsPage = lazy(
  () => import('@/pages/AdminInventory/AdminProductsPage')
);
const AdminProductFormPage = lazy(
  () => import('@/pages/AdminInventory/AdminProductFormPage')
);

const ROLES = {
  ROLE_ADMIN: 'admon_roles',
  INV_ADMIN: 'admon_inventario',
  CASHIER: 'cajero',
  USER: 'user', //?era cliente o user?
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
        path: 'dashboard', // Nueva ruta
        element: (
          <ProtectedRoleRoute
            element={<AdminDashboardPage />}
            allowedRoles={[ROLES.INV_ADMIN]}
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
      {
        path: 'products/:id/edit', // Ruta dinámica
        element: (
          <ProtectedRoleRoute
            element={<AdminProductEditPage />}
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
  {
    path: '/pos/search',
    element: (
      <ProtectedRoleRoute
        element={<PosPage />}
        allowedRoles={[ROLES.CASHIER]}
      />
    ),
  },
  {
    path: '/pos/sale',
    element: (
      <ProtectedRoleRoute
        element={<PosPage />}
        allowedRoles={[ROLES.CASHIER]}
      />
    ),
  },
  {
    path: '/pos/close',
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
    element: <ProtectedAuthRoute element={<ProfilePage />} />,
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
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/verify',
    element: <VerifyPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
