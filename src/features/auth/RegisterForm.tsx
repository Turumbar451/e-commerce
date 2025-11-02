import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Chrome } from 'lucide-react';
import { Link } from 'react-router';

export function RegisterForm() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
        <CardDescription>Completa tus datos para unirte.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-6">
            {/** campo nombre */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre completo" required />
            </div>

            {/* campo correo */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                required
              />
            </div>

            {/* campo contraseña */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required />
            </div>

            {/* campo confirmacion */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input id="confirmPassword" type="password" required />
            </div>

            <Button type="submit" className="w-full font-semibold">
              Crear cuenta
            </Button>
          </div>
        </form>

        {/* Divisor "o"  */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">O</span>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <Chrome className="mr-2 h-4 w-4" />
          Continuar con Google
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center text-sm">
        <span className="text-muted-foreground">¿Ya tienes una cuenta?</span>
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline ml-1"
        >
          Iniciar sesión
        </Link>
      </CardFooter>
    </Card>
  );
}
