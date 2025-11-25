import { useState } from 'react';
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
import {
  PlusCircle,
  Trash2,
  UserCog,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { CreateUserDialog } from '@/features/admin2/components/CreateUserDialog';
import { useAdminUsers } from '@/features/admin2/hooks/useAdminUsers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { IEmployee } from '@/interfaces/adminUser';
import { EditUserDialog } from '@/features/admin2/components/EditUserDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
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
  const {
    employees,
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    refetch,
    roleFilter,
    setRoleFilter,
    handleDeleteUser,
  } = useAdminUsers();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IEmployee | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // estado para eliminar usuario
  const [userToDelete, setUserToDelete] = useState<IEmployee | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditClick = (user: IEmployee) => {
    setEditingUser(user);
    setIsEditOpen(true);
  };

  const confirmDelete = (user: IEmployee) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const executeDelete = () => {
    if (userToDelete) {
      handleDeleteUser(userToDelete.id);
      setIsDeleteOpen(false);
      setUserToDelete(null);
    }
  };

  // helpers para renderizar iconos de ordenamiento
  const renderSortIcon = (columnKey: 'nombre' | 'fecha_alta') => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />; // Icono neutro
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4 text-primary" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-primary" />
    );
  };

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
        Error al cargar personal.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de Personal
          </h1>
          <p className="text-muted-foreground">
            Administra las cuentas de acceso.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios Activos</CardTitle>
          <CardDescription>
            Lista de empleados con acceso al sistema.
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
            {/* filtro de roles */}
            <div className="w-[200px]">
              <Select
                value={roleFilter}
                onValueChange={(val: any) => setRoleFilter(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los roles</SelectItem>
                  <SelectItem value="admon_roles">Admin. Roles</SelectItem>
                  <SelectItem value="admon_inventario">
                    Admin. Inventario
                  </SelectItem>
                  <SelectItem value="cajero">Cajero</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* empleado */}
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('nombre')}
                      className="-ml-4 h-8 font-bold hover:bg-transparent"
                    >
                      Empleado
                      {renderSortIcon('nombre')}
                    </Button>
                  </TableHead>

                  <TableHead>Rol Asignado</TableHead>
                  <TableHead>Correo Electrónico</TableHead>

                  {/*  FECHA */}
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('fecha_alta')}
                      className="-ml-4 h-8 font-bold hover:bg-transparent"
                    >
                      Fecha Alta
                      {renderSortIcon('fecha_alta')}
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
                      {searchTerm
                        ? 'No se encontraron resultados.'
                        : 'No hay empleados.'}
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
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(emp)}
                          >
                            <UserCog className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => confirmDelete(emp)}
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
      <EditUserDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        userToEdit={editingUser}
        onSuccess={() => refetch()} // refrescar la tabla al terminar
      />
      <CreateUserDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={refetch}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la cuenta de{' '}
              <span className="font-bold text-foreground">
                {userToDelete?.nombre} {userToDelete?.apellido}
              </span>
              . El empleado perderá acceso al sistema inmediatamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sí, eliminar cuenta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsersPage;
