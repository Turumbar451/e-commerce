import { useState, memo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, Plus, Minus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { formatCurrency } from '@/lib/formatters';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export interface InventoryItem {
  id: string;
  name: string;
  variantName: string;
  sku: string;
  size: string;
  stock: number;
  price: number;
  imageUrl: string;
  status: 'Agotado' | 'Bajo' | 'Óptimo';
}

interface RowProps {
  item: InventoryItem;
  onAdjustStock: (sku: string, size: string, adjustment: number) => void;
  // Cambiamos esto: ahora solo pide confirmar
  onRequestDelete: (item: InventoryItem) => void;
}

const InventoryRow = memo(
  ({ item, onAdjustStock, onRequestDelete }: RowProps) => {
    return (
      <TableRow>
        <TableCell className="font-medium flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="width={48} height={48} object-cover"
              loading="lazy"
              decoding="async" // Ayuda a que la imagen no bloquee el render
            />
          </div>
          <div className="flex flex-col">
            <span className="line-clamp-1">{item.name}</span>
            <span className="text-xs text-muted-foreground">
              {item.variantName}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-mono text-xs">{item.sku}</TableCell>
        <TableCell>{item.size}</TableCell>
        <TableCell className="font-bold text-base">{item.stock}</TableCell>
        <TableCell>
          <Badge
            variant={
              item.status === 'Bajo' || item.status === 'Agotado'
                ? 'destructive'
                : 'secondary'
            }
            className="whitespace-nowrap"
          >
            {item.status}
          </Badge>
        </TableCell>
        <TableCell>{formatCurrency(item.price)}</TableCell>

        <TableCell>
          <div className="flex items-center gap-1">
            <div className="flex items-center border rounded-md mr-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-r-none hover:bg-muted"
                onClick={() => onAdjustStock(item.sku, item.size, -1)}
                disabled={item.stock <= 0}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <div className="w-px h-4 bg-border"></div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-l-none hover:bg-muted"
                onClick={() => onAdjustStock(item.sku, item.size, 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
              onClick={() => onRequestDelete(item)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  },
  (prev, next) =>
    prev.item.id === next.item.id &&
    prev.item.stock === next.item.stock &&
    prev.item.status === next.item.status
);

interface ProductDataTableProps {
  items: InventoryItem[];
  isLoading: boolean;
  isError: boolean;
  onAdjustStock: (sku: string, size: string, adjustment: number) => void;
  onDeleteSize: (sku: string, size: string) => void;
  isDeletingSize?: boolean;
}

export const ProductDataTable = ({
  items,
  isLoading,
  isError,
  onAdjustStock,
  onDeleteSize,
}: ProductDataTableProps) => {
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventario por Talla</CardTitle>
        <CardDescription>
          Filtra y ajusta el stock de cada SKU y talla
        </CardDescription>
        <div className="flex items-center gap-4 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nombre o SKU..." className="pl-10" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden min-h-[65vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Talla</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="w-[140px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    <Spinner className="h-6 w-6 mx-auto" />
                  </TableCell>
                </TableRow>
              )}
              {isError && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-destructive"
                  >
                    Error al cargar los productos.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                items.map((item) => (
                  <InventoryRow
                    key={item.id}
                    item={item}
                    onAdjustStock={onAdjustStock}
                    onRequestDelete={setItemToDelete}
                  />
                ))}

              {!isLoading && items.length > 0 && items.length < 5 && (
                <TableRow style={{ height: `${(10 - items.length) * 60}px` }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Talla?</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de eliminar la talla{' '}
              <strong>{itemToDelete?.size}</strong> del producto{' '}
              <strong>{itemToDelete?.name}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => {
                if (itemToDelete)
                  onDeleteSize(itemToDelete.sku, itemToDelete.size);
                setItemToDelete(null); // Cerrar modal manualmente
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
