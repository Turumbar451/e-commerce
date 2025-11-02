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

export function LoginForm() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a tu cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-6">
            {/* Campo de Correo */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                required
              />
            </div>

            {/* Campo de Contraseña */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  to="/forgot-password" // Ruta para olvidar contraseña
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              {/*se necesitara cambiar este input porque necesitamos el icono del ojito
               */}
              <Input id="password" type="password" required />
            </div>

            <Button type="submit" className="w-full font-semibold">
              Iniciar sesión
            </Button>
          </div>
        </form>

        {/* divisor "o" */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">O</span>
          </div>
        </div>

        {/* boton de google */}
        <Button variant="outline" className="w-full">
          <Chrome className="mr-2 h-4 w-4" />
          Continuar con Google
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <span className="text-muted-foreground">¿No tienes cuenta?</span>
        <Link
          to="/register" // Ruta para crear cuenta
          className="font-semibold text-primary hover:underline ml-1"
        >
          Crear cuenta
        </Link>
      </CardFooter>
    </Card>
  );
}
