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
import VerifyPage from '@/pages/VerifyPage';
import AdminProductEditPage from '@/pages/AdminInventory/AdminProductEditPage';
import { ROLES } from '@/lib/constants';

const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const PosPage = lazy(() => import('@/pages/Cajero/PosPage'));
const PosSalesHistoryPage = lazy(
  () => import('@/pages/Cajero/PosSalesHistoryPage')
);
const PosRefundsPage = lazy(() => import('@/pages/Cajero/PosRefundsPage'));
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

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <StoreRouteGuard element={<HomePage />} />,
  },
  {
    path: '/hombres',
    element: <StoreRouteGuard element={<HomePage targetGender="H" />} />,
  },
  {
    path: '/mujeres',
    element: <StoreRouteGuard element={<HomePage targetGender="M" />} />,
  },
  {
    path: '/niños',
    element: <StoreRouteGuard element={<HomePage targetGender="N" />} />,
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
        allowedRoles={[ROLES.ROLE_MANAGER, ROLES.INVENTORY_MANAGER]}
      />
    ),
    children: [
      {
        path: 'products',
        element: (
          <ProtectedRoleRoute
            element={<AdminProductsPage />}
            allowedRoles={[ROLES.INVENTORY_MANAGER]} // O ambos admins
          />
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoleRoute
            element={<AdminDashboardPage />}
            allowedRoles={[ROLES.INVENTORY_MANAGER]}
          />
        ),
      },
      {
        path: 'products/new',
        element: (
          <ProtectedRoleRoute
            element={<AdminProductFormPage />}
            allowedRoles={[ROLES.INVENTORY_MANAGER]}
          />
        ),
      },
      {
        path: 'users',
        // admin de roles
        element: (
          <ProtectedRoleRoute
            element={<AdminUsersPage />}
            allowedRoles={[ROLES.ROLE_MANAGER]}
          />
        ),
      },
      {
        path: 'inventory',
        // solo para admin de inventario
        element: (
          <ProtectedRoleRoute
            element={<AdminInventoryPage />}
            allowedRoles={[ROLES.INVENTORY_MANAGER]}
          />
        ),
      },
      {
        path: 'products/:id/edit', // Ruta dinámica
        element: (
          <ProtectedRoleRoute
            element={<AdminProductEditPage />}
            allowedRoles={[ROLES.INVENTORY_MANAGER]}
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
  {
    path: '/pos/history',
    element: (
      <ProtectedRoleRoute
        element={<PosSalesHistoryPage />}
        allowedRoles={[ROLES.CASHIER]}
      />
    ),
  },
  {
    path: '/pos/refunds',
    element: (
      <ProtectedRoleRoute
        element={<PosRefundsPage />}
        allowedRoles={[ROLES.CASHIER]}
      />
    ),
  },

  // rutas del cliente
  {
    path: '/cart',
    element: (
      <ProtectedRoleRoute
        element={<CartPage />}
        allowedRoles={[ROLES.CUSTOMER]}
      />
    ),
  },
  {
    path: '/favorites',
    element: (
      <ProtectedRoleRoute
        element={<FavoritesPage />}
        allowedRoles={[ROLES.CUSTOMER]}
      />
    ),
  },
  {
      path: '/checkout',
      element: (
        <ProtectedRoleRoute
          element={<CheckoutPage />}
          allowedRoles={[ROLES.CUSTOMER]}
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
