import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

import { getAddresses, addAddress, type Address } from '@/services/userService';
//import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  selectedAddressId: string | null;
  onSelect: (id: string) => void;
}

export const AddressSelector = ({ selectedAddressId, onSelect }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // 1. Obtener direcciones
  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  });

  // 2. Mutación para agregar
  const addMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: (newAddress) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setIsDialogOpen(false);
      onSelect(newAddress._id!); // Seleccionar automáticamente la nueva
      toast.success('Dirección agregada');
    },
    onError: () => toast.error('Error al guardar dirección'),
  });

  // Formulario local temporal
  const handleSubmitNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddr: any = Object.fromEntries(formData.entries());
    addMutation.mutate(newAddr);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-4">
      {/* Lista de Direcciones */}
      {addresses?.length === 0 ? (
        <p className="text-muted-foreground">No tienes direcciones guardadas.</p>
      ) : (
        <RadioGroup value={selectedAddressId || ''} onValueChange={onSelect}>
          <div className="grid gap-4 md:grid-cols-2">
            {addresses?.map((addr) => (
              <div key={addr._id} className={`relative flex items-start space-x-3 rounded-lg border p-4 ${selectedAddressId === addr._id ? 'border-primary bg-primary/5' : ''}`}>
                <RadioGroupItem value={addr._id!} id={addr._id} className="mt-1" />
                <div className="grid gap-1.5 leading-none w-full">
                  <Label htmlFor={addr._id} className="font-semibold cursor-pointer flex items-center gap-2">
                      <MapPin className="h-3 w-3" /> {addr.calle} #{addr.numero_exterior}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {addr.colonia}, {addr.codigo_postal}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {addr.municipio}, {addr.estado}
                  </p>
                  <div className="flex items-center pt-2 text-xs text-muted-foreground">
                    <Phone className="mr-1 h-3 w-3" /> {addr.telefono}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}

      {/* Botón para abrir Modal de Nueva Dirección */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full border-dashed">
            <Plus className="mr-2 h-4 w-4" /> Agregar nueva dirección
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nueva Dirección de Envío</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitNew} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calle">Calle</Label>
                <Input id="calle" name="calle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero_exterior">No. Ext</Label>
                <Input id="numero_exterior" name="numero_exterior" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="colonia">Colonia</Label>
                <Input id="colonia" name="colonia" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo_postal">C.P.</Label>
                <Input id="codigo_postal" name="codigo_postal" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="municipio">Municipio/Ciudad</Label>
                <Input id="municipio" name="municipio" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Input id="estado" name="estado" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono de contacto</Label>
              <Input id="telefono" name="telefono" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="referencias">Referencias (Opcional)</Label>
              <Input id="referencias" name="referencias" />
            </div>
            <Button type="submit" disabled={addMutation.isPending}>
              {addMutation.isPending ? 'Guardando...' : 'Guardar Dirección'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};