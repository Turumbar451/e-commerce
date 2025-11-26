import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { RoleFilter } from '../../hooks/useAdminUsers';
import { ROLES } from '@/lib/constants';

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  roleFilter: RoleFilter;
  setRoleFilter: (value: RoleFilter) => void;
}

export const AdminUsersFilters = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
}: Props) => {
  return (
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
      <div className="w-[200px]">
        <Select
          value={roleFilter}
          onValueChange={(val) => setRoleFilter(val as RoleFilter)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los roles</SelectItem>
            <SelectItem value={ROLES.ROLE_MANAGER}>Admin. Roles</SelectItem>
            <SelectItem value={ROLES.INVENTORY_MANAGER}>
              Admin. Inventario
            </SelectItem>
            <SelectItem value={ROLES.CASHIER}>Cajero</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
