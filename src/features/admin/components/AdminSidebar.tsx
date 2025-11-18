import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  LogOut,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
//import { cn } from '@/lib/utils';
import { MyLogoSvg } from '@/components/MyLogoSvg';

// componente de links
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
  // conectar con el global context
  const handleLogout = () => {
    console.log('Cerrar sesión...');
  };

  return (
    <aside className="w-64 flex flex-col h-screen border-r bg-background p-4">
      {/* logo*/}
      <div className="px-4 py-2 mb-4 flex items-center gap-2">
        <MyLogoSvg className="h-14 w-14 text-primary" />
        <span className="text-xl font-bold">ShoeAdmin</span>
      </div>

      {/* navegar */}
      <nav className="flex flex-col gap-2 flex-1">
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
        <SidebarLink
          to="/admin/users"
          label="Usuarios"
          icon={<Users className="mr-2 h-4 w-4" />}
        />
      </nav>

      {/*configurar y salir */}
      <div className="flex flex-col gap-2">
        <SidebarLink
          to="/profile"
          label="Configuración"
          icon={<Settings className="mr-2 h-4 w-4" />}
        />
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
};
