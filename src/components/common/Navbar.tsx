import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ShoppingCart, User, LogOut, Menu, Heart } from 'lucide-react'; // <--- 1. Agregamos Heart
import { Link, useNavigate } from 'react-router';
import { MyLogoSvg } from '@/components/MyLogoSvg';
import { ModeToggle } from '@/components/common/ModeToggle';
import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';
import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

const navLinks = [
  { href: '/hombres', label: 'Hombres' },
  { href: '/mujeres', label: 'Mujeres' },
  { href: '/niños', label: 'Niños' },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { performAuthenticatedAction } = useAuthenticatedAction();
  const { authStatus, user, logout } = useContext(GlobalContext);

  const handleGuestClick = () => {
    performAuthenticatedAction(
      () => navigate('/cart'),
      'Inicia sesión para ver tu carrito'
    );
  };

  // --- 2. Nueva función para ir a favoritos ---
  const handleFavoritesClick = () => {
    performAuthenticatedAction(
      () => navigate('/favorites'),
      'Inicia sesión para ver tus favoritos'
    );
  };
  // --------------------------------------------

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container h-20 mx-auto flex items-center justify-between relative">
        {/* Logo-texto y Nav Desktop*/}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-3xl hidden sm:inline-block">
              E-COMMERCE
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* logo svg en pc */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <Link to="/" aria-label="Ir al inicio">
            <MyLogoSvg className="h-20 w-auto text-primary" />
          </Link>
        </div>

        {/* derecha */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* --- VISTA ESCRITORIO --- */}
          <div className="hidden md:flex items-center gap-2">
            {/* 3. Botón de Favoritos (Nuevo) */}
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={handleFavoritesClick}
              aria-label="Ver mis favoritos"
            >
              <Heart className="h-5 w-5 text-foreground/70" />
            </Button>
            {/* --------------------------- */}

            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={handleGuestClick}
              aria-label="Ver carrito"
            >
              <ShoppingCart className="h-5 w-5 text-foreground/70" />
            </Button>

            {authStatus === 'authenticated' ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/70 hidden lg:inline-block">
                  {user?.nombre ?? 'Usuario'}
                </span>

                <Button
                  className="text-base cursor-pointer"
                  variant="outline"
                  onClick={() => navigate('/profile')}
                >
                  Ver mi cuenta
                </Button>

                <Button
                  className="text-base cursor-pointer"
                  variant="outline"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="text-base cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </div>

          {/* --- VISTA MOVIL (Menu Hamburguesa) --- */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                <SheetDescription className="sr-only">
                  Enlaces para navegar por el sitio y gestionar la cuenta.
                </SheetDescription>

                <Link to="/" className=" mt-4 mb-6 flex justify-center">
                  <MyLogoSvg className="h-20 w-auto text-primary" />
                </Link>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        to={link.href}
                        className="text-xl font-medium text-foreground/70 hover:text-foreground text-center"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-8 flex flex-col gap-4">
                  {/* 4. Botón Favoritos Móvil (Nuevo) */}
                  <Button
                    variant="outline"
                    className="text-base justify-start"
                    onClick={handleFavoritesClick}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Mis Favoritos
                  </Button>
                  {/* -------------------------------- */}

                  <Button
                    variant="outline"
                    className="text-base justify-start"
                    onClick={handleGuestClick}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ver Carrito
                  </Button>

                  {authStatus === 'authenticated' ? (
                    <Button
                      className="text-base justify-start"
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar sesión ({user?.nombre})
                    </Button>
                  ) : (
                    <Link to="/login">
                      <SheetClose asChild>
                        <Button className="w-full text-base justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Iniciar sesión
                        </Button>
                      </SheetClose>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
