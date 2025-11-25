import { Button } from '@/components/ui/button';
import { GlobalContext } from '@/context/GlobalContext';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

const tabs = [
  { to: '/pos/search', label: 'Búsqueda de productos' },
  { to: '/pos/sale', label: 'Venta de productos' },
  { to: '/pos/history', label: 'Historial de ventas' },
  { to: '/pos/refunds', label: 'Reembolsos' },
  { to: '/pos/close', label: 'Cierre de caja' },
];

export const NavbarCashier = () => {
  const { logout } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="w-full border-b bg-background/95">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Panel de cajero</span>
          <span className="text-xs text-muted-foreground">Gestión rápida de ventas en tienda</span>
        </div>
        <nav className="flex-1 flex items-center justify-center gap-2 max-w-xl">
          {tabs.map((tab) => {
            const isActive =
              location.pathname === tab.to ||
              (tab.to === '/pos/sale' && location.pathname === '/pos');
            return (
              <Link key={tab.to} to={tab.to} className="flex-1">
                <Button
                  type="button"
                  variant={isActive ? 'default' : 'outline'}
                  className="w-full text-xs sm:text-sm"
                >
                  {tab.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            className="text-xs sm:text-sm whitespace-nowrap"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  );
};
