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
import { Search, Plus, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { formatCurrency } from '@/lib/formatters';

//!mover esto a un archivo de interfaces
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

interface ProductDataTableProps {
  items: InventoryItem[];
  isLoading: boolean;
  isError: boolean;
}

export const ProductDataTable = ({
  items,
  isLoading,
  isError,
}: ProductDataTableProps) => {
  //!logica para abrir un modal que ajuste el stock
  const handleAdjustStock = (item: InventoryItem, adjustment: number) => {
    console.log(`Ajustar stock para ${item.sku} / ${item.size}:`, adjustment);
    //!hacer una mutacion que llame a endpooint
    //!PUT /api/admini/products/:sku/:size/stock o algo que aun no esta
  };

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Talla</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Precio</TableHead>
              {/*ACCIONES*/}
              <TableHead className="w-[100px]">Ajustar Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  <Spinner className="h-6 w-6" />
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-destructive">
                  Error al cargar los productos.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded-md border"
                    />
                    <div>
                      {item.name}
                      <div className="text-xs text-muted-foreground">
                        {item.variantName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell className="font-bold">{item.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === 'Bajo' ? 'destructive' : 'secondary'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(item.price)}</TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAdjustStock(item, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAdjustStock(item, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
