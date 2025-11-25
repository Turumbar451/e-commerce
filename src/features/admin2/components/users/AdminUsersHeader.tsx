import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface Props {
  onCreateClick: () => void;
}

export const AdminUsersHeader = ({ onCreateClick }: Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Personal
        </h1>
        <p className="text-muted-foreground">
          Administra las cuentas de acceso y roles del sistema.
        </p>
      </div>
      <Button onClick={onCreateClick}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Nuevo Empleado
      </Button>
    </div>
  );
};
