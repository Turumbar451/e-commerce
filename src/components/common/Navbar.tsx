import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import { ShoppingCart, User, Menu } from 'lucide-react';

import { Link, useNavigate } from 'react-router';

import { MyLogoSvg } from '@/components/MyLogoSvg';

import { ModeToggle } from '@/components/common/ModeToggle';

import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';



const navLinks = [

  { href: '/hombres', label: 'Hombres' },

  { href: '/mujeres', label: 'Mujeres' },

  { href: '/niños', label: 'Niños' },

];



export const Navbar = () => {

  const navigate = useNavigate();

  const { performAuthenticatedAction } = useAuthenticatedAction();
  
  const { authStatus, user, logout } = useContext(GlobalContext);
  const isAuthenticated = authStatus === 'authenticated' && !!user;   

  const handleGuestClick = () => {

    performAuthenticatedAction(

      () => navigate('/cart'),

      'Inicia sesión para ver tu carrito'

    );

  };



  return (

    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">

      <div className="container h-20 mx-auto flex items-center justify-between relative">

        {/* Logo-texto y Nav Desktop*/}

        <div className="flex items-center gap-8">

          {' '}

          {/* Logo Texto */}

          <Link to="/" className="flex items-center space-x-2">

            <span className="font-bold text-3xl hidden sm:inline-block">

              E-COMMERCE

            </span>

          </Link>

          {/* links de navegacion en pc */}

          <nav className="hidden md:flex items-center gap-8 text-base font-medium">

            {' '}

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

            <MyLogoSvg className="h-20 w-auto text-primary" />{' '}

          </Link>

        </div>



        {/* derecha */}

        <div className="flex items-center gap-2 md:gap-4">

          {/* carrito e inicion de sesion pc */}

          <div className="hidden md:flex items-center gap-2  ">

            <Button

              className="cursor-pointer"

              variant="ghost"

              size="icon"

              onClick={handleGuestClick}

              aria-label="Ver carrito (requiere inicio de sesión)"

            >

              <ShoppingCart className="h-5 w-5 text-foreground/70" />

            </Button>

            {!isAuthenticated ? (
  <Link to="/login">
    <Button className="text-base cursor-pointer">
      <User className="h-4 w-4 mr-2" />
      Iniciar sesión
    </Button>
  </Link>
) : (
  <>
    <Button
      className="text-base cursor-pointer"
      variant="ghost"
      onClick={() => navigate('/profile')}
    >
      <User className="h-4 w-4 mr-2" />
      {user?.nombre || 'Mi cuenta'}
    </Button>

    <Button
      className="text-base cursor-pointer"
      variant="outline"
      onClick={() => {
        logout();
        navigate('/');
      }}
    >
      Cerrar sesión
    </Button>
  </>
        )}

          </div>



          {/* menu telefono (HAMBURRGUESA)  */}

          <div className="md:hidden">

            <Sheet>

              <SheetTrigger asChild>

                <Button variant="outline" size="icon">

                  <Menu className="h-5 w-5" />

                  <span className="sr-only">Abrir menú</span>

                </Button>

              </SheetTrigger>

              <SheetContent side="left">

                {/*ESTE CACHO no sompe la app pero es para la accesibilidad xd  */}

                <SheetTitle className="sr-only">Menú Principal</SheetTitle>

                <SheetDescription className="sr-only">

                  Enlaces para navegar por el sitio y gestionar la cuenta.

                </SheetDescription>

                {/*ESTE CACHO no sompe la app pero es para la accesibilidad xd  */}



                {/*Logo SVG en el telegono */}

                <Link to="/" className=" mt-4 mb-6 flex justify-center">

                  <MyLogoSvg className="h-20 w-auto text-primary" />

                </Link>



                {/* Navegación telefono */}

                <nav className="flex flex-col gap-4">

                  {navLinks.map((link) => (

                    <SheetClose key={link.href} asChild>

                      {/*  fuentes grandes en telefono */}

                      <Link

                        to={link.href}

                        className="text-xl font-medium text-foreground/70 hover:text-foreground text-center"

                      >

                        {link.label}

                      </Link>

                    </SheetClose>

                  ))}

                </nav>



                {/*botones en el telefono */}

                <div className="mt-8 flex flex-col gap-4">

                 {/* En la sección móvil, reemplaza el botón de Carrito problemático por este */}
                  <Button
                    variant="outline"
                    className="text-base"
                    onClick={handleGuestClick}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ver Carrito {/* Ahora el ícono y el texto están dentro del botón */}
                  </Button>

                  {!isAuthenticated ? (
                    <Link to="/login">
                      <Button className="text-base w-full">
                        <User className="h-4 w-4 mr-2" />
                        Iniciar sesión
                      </Button>
                    </Link>
                  ) : (
                  <>
                    <SheetClose asChild>
                      <Button
                        className="text-base w-full"
                        onClick={() => navigate('/profile')}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Mi cuenta
                      </Button>
                    </SheetClose>

                    <Button
                      variant="outline"
                      className="text-base w-full"
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                    >
                      Cerrar sesión
                    </Button>
                  </>
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