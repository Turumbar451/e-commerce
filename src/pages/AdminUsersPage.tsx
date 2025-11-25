import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

import { CreateUserDialog } from '@/features/admin2/components/CreateUserDialog';
import { EditUserDialog } from '@/features/admin2/components/EditUserDialog';
import { useAdminUsers } from '@/features/admin2/hooks/useAdminUsers';
import type { IEmployee } from '@/interfaces/adminUser';
import { AdminUsersHeader } from '@/features/admin2/components/users/AdminUsersHeader';
import { AdminUsersFilters } from '@/features/admin2/components/users/AdminUsersFilters';
import { UsersTable } from '@/features/admin2/components/users/UserTable';
import { DeleteUserAlert } from '@/features/admin2/components/users/DeleteUserAlert';

const AdminUsersPage = () => {
  const {
    employees,
    isLoading,
    isError,
    refetch,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    sortConfig,
    handleSort,
    handleDeleteUser,
  } = useAdminUsers();

  //modales
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<IEmployee | null>(null);

  const handleEditClick = (user: IEmployee) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (user: IEmployee) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      handleDeleteUser(selectedUser.id);
      setIsDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  if (isError)
    return (
      <div className="p-8 text-center text-destructive">
        Error al cargar personal.
      </div>
    );

  return (
    <div className="container mx-auto">
      <AdminUsersHeader onCreateClick={() => setIsCreateOpen(true)} />

      <Card>
        <CardHeader>
          <CardTitle>Usuarios Activos</CardTitle>
          <CardDescription>
            Lista de empleados con acceso al sistema.
          </CardDescription>

          <AdminUsersFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />
        </CardHeader>

        <CardContent>
          <UsersTable
            employees={employees}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </CardContent>
      </Card>

      {/* modales */}
      <CreateUserDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={refetch}
      />

      <EditUserDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        userToEdit={selectedUser}
        onSuccess={() => refetch()}
      />

      <DeleteUserAlert
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        userName={
          selectedUser ? `${selectedUser.nombre} ${selectedUser.apellido}` : ''
        }
      />
    </div>
  );
};

export default AdminUsersPage;
