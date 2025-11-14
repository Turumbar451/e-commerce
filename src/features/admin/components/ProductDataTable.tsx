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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { Spinner } from '@/components/ui/spinner';
import { formatCurrency } from '@/lib/formatters';

export const ProductDataTable = () => {
  const { products, isLoading, isError } = useAdminProducts();
  //aplanar la data
  //por cada talla se crea un producto
  //se crea arreglo de productos
  //por cada variante se crea un arreglo de arreglos de "tallas"
  //por eso se aplana
  //y asi hasta producto
  const inventoryItems = products.flatMap((product) =>
    product.variants.flatMap((variant) =>
      variant.sizes.map((size) => ({
        id: `${product._id}-${variant.sku}-${size.size}`, //id para la fila
        name: product.name,
        variantName: variant.colorName,
        sku: variant.sku,
        size: size.size,
        stock: size.stock,
        price: product.salePrice || product.price, // precio del producto padre
        imageUrl: variant.images[0] || '/placeholder-shoe.jpg',
        // logica de bajo stock
        status:
          size.stock === 0 ? 'Agotado' : size.stock < 10 ? 'Bajo' : 'Óptimo',
      }))
    )
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>
          Busca, edita y gestiona todos los productos de tu tienda.
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
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* carga */}
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

            {/* data real*/}
            {!isLoading &&
              inventoryItems.map((item) => (
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
