import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCog, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { IEmployee } from '@/interfaces/adminUser';
import type { SortConfig } from '../../hooks/useAdminUsers';

const ROLES_LABELS: Record<string, string> = {
  admon_roles: 'Admin. Roles',
  admon_inventario: 'Admin. Inventario',
  cajero: 'Cajero',
};

const ROLE_BADGE_VARIANTS: Record<string, 'default' | 'secondary' | 'outline'> =
  {
    admon_roles: 'default',
    admon_inventario: 'secondary',
    cajero: 'outline',
  };

interface Props {
  employees: IEmployee[];
  sortConfig: SortConfig;
  onSort: (key: 'nombre' | 'fecha_alta') => void;
  onEdit: (user: IEmployee) => void;
  onDelete: (user: IEmployee) => void;
}

export const UsersTable = ({
  employees,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
}: Props) => {
  const renderSortIcon = (columnKey: 'nombre' | 'fecha_alta') => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4 text-primary" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-primary" />
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort('nombre')}
                className="-ml-4 h-8 font-bold hover:bg-transparent"
              >
                Empleado {renderSortIcon('nombre')}
              </Button>
            </TableHead>
            <TableHead>Rol Asignado</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort('fecha_alta')}
                className="-ml-4 h-8 font-bold hover:bg-transparent"
              >
                Fecha Alta {renderSortIcon('fecha_alta')}
              </Button>
            </TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-24 text-muted-foreground"
              >
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          ) : (
            employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span className="text-base">
                      {emp.nombre} {emp.apellido}
                    </span>
                    {!emp.activo && (
                      <span className="text-xs text-yellow-600">
                        • Pendiente
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={ROLE_BADGE_VARIANTS[emp.role] || 'outline'}>
                    {ROLES_LABELS[emp.role] || emp.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {emp.email}
                </TableCell>
                <TableCell>
                  {new Date(emp.fecha_alta).toLocaleDateString('es-MX')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(emp)}
                    >
                      <UserCog className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => onDelete(emp)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
