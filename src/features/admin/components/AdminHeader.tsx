import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/common/ModeToggle';
import { Button } from '@/components/ui/button';

const UserNav = () => {
  return (
    <div className="mx-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src="/ruta-al-avatar.jpg" alt="@admin" /> */}
              <AvatarFallback>AI</AvatarFallback>{' '}
              {/* iniciales por si no hay foto */}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                Admin Inventario
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                inventario@tienda.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-end">
        <ModeToggle />
        <UserNav />
      </div>
    </header>
  );
};
