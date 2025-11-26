import { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Warehouse,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MyLogoSvg } from '@/components/MyLogoSvg';
import { GlobalContext } from '@/context/GlobalContext';

import { ROLES } from '@/lib/constants';

const SidebarLink = ({ to, icon, label }: any) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(to);

  return (
    <Button
      asChild
      variant={isActive ? 'secondary' : 'ghost'}
      className="w-full justify-start"
    >
      <Link to={to}>
        {icon}
        {label}
      </Link>
    </Button>
  );
};

export const AdminSidebar = () => {
  const { user } = useContext(GlobalContext);

  return (
    <aside className="w-64 flex flex-col h-screen border-r bg-background p-4">
      {/* logo */}
      <div className="px-4 py-2 mb-4 flex items-center gap-2">
        <MyLogoSvg className="h-14 w-14 text-primary" />
        <span className="text-xl font-bold">ShoeAdmin</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {/* ADMIN INVENTARIO */}
        {user?.role === ROLES.INVENTORY_MANAGER && (
          <>
            <SidebarLink
              to="/admin/dashboard"
              label="Dashboard"
              icon={<LayoutDashboard className="mr-2 h-4 w-4" />}
            />
            <SidebarLink
              to="/admin/products"
              label="Productos"
              icon={<Package className="mr-2 h-4 w-4" />}
            />
            <SidebarLink
              to="/admin/orders"
              label="Pedidos"
              icon={<ShoppingCart className="mr-2 h-4 w-4" />}
            />
            <SidebarLink
              to="/admin/inventory"
              label="Inventario"
              icon={<Warehouse className="mr-2 h-4 w-4" />}
            />
          </>
        )}

        {/* ADMIN ROLES */}
        {user?.role === ROLES.ROLE_MANAGER && (
          <>
            <div className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Gestión
            </div>
            <SidebarLink
              to="/admin/users"
              label="Personal"
              icon={<Users className="mr-2 h-4 w-4" />}
            />
          </>
        )}
      </nav>
    </aside>
  );
};
