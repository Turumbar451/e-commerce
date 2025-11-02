import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PasswordInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'>;

export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)} // añadir padding derecho
        {...props}
      />

      {/* boton de forma absoluta */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className=" cursor-pointer absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {/* icono correspondiente */}
        {showPassword ? (
          <EyeOff className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        </span>
      </Button>
    </div>
  );
};
