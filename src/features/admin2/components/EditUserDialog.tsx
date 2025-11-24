import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PasswordInput } from '@/components/common/PasswordInput';
import { updateInternalUser } from '@/services/adminUsersService';
import type { IEmployee } from '@/interfaces/adminUser';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userToEdit: IEmployee | null;
  onSuccess: () => void;
}

export const EditUserDialog = ({
  open,
  onOpenChange,
  userToEdit,
  onSuccess,
}: Props) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    role: '',
    password: '',
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        nombre: userToEdit.nombre,
        apellido: userToEdit.apellido,
        email: userToEdit.email,
        role: userToEdit.role,
        password: '',
      });
    }
  }, [userToEdit]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!userToEdit) return;
      await updateInternalUser(userToEdit.id, formData);
    },
    onSuccess: () => {
      toast.success('Empleado actualizado correctamente');
      onOpenChange(false);
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al actualizar');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Empleado</DialogTitle>
          <DialogDescription>
            Modifica los datos. Deja la contraseña en blanco para mantener la
            actual.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-nombre">Nombre</Label>
              <Input
                id="edit-nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-apellido">Apellido</Label>
              <Input
                id="edit-apellido"
                value={formData.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Correo Electrónico</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-role">Rol Asignado</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger id="edit-role">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cajero">Cajero</SelectItem>
                <SelectItem value="admon_inventario">
                  Admin. Inventario
                </SelectItem>
                <SelectItem value="admon_roles">Admin. Roles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-password">Nueva Contraseña (Opcional)</Label>
            <PasswordInput
              id="edit-password"
              placeholder="Dejar vacío para no cambiar"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
