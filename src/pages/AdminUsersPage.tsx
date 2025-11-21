// src/pages/AdminUsersPage.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getInternalUsers } from '@/services/adminUsersService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { PlusCircle, Trash2, UserCog, Search } from 'lucide-react';
import { CreateUserDialog } from '@/features/admin2/components/CreateUserDialog';

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

const AdminUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false); //estado del modal
  const {
    data: employees,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['internalUsers'],
    queryFn: getInternalUsers,
  });

  // filtro de clientes
  const filteredEmployees = employees?.filter(
    (emp) =>
      emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-destructive">
        Error al cargar la lista de personal.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de Personal
          </h1>
          <p className="text-muted-foreground">
            Administra las cuentas de acceso y roles del sistema.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>
      {/* tarjeta */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios Activos</CardTitle>
          <CardDescription>
            Lista de empleados con acceso al panel administrativo o punto de
            venta.
          </CardDescription>

          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead>Rol Asignado</TableHead>
                  <TableHead>Correo Electrónico</TableHead>
                  <TableHead>Fecha Alta</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center h-24 text-muted-foreground"
                    >
                      No se encontraron resultados.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees?.map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-base">
                            {emp.nombre} {emp.apellido}
                          </span>
                          {!emp.activo && (
                            <span className="text-xs text-yellow-600 font-normal">
                              • Pendiente verificación
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={ROLE_BADGE_VARIANTS[emp.role] || 'outline'}
                        >
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
                          <Button variant="ghost" size="icon">
                            <UserCog className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
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
        </CardContent>
      </Card>
      {/* modal para crear usuario*/}
      <CreateUserDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default AdminUsersPage;
