import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import type { IProductDetail } from '@/interfaces/product';
import { useDelete } from '../hooks/useDelete';
import { Spinner } from '@/components/ui/spinner';
import { Link } from 'react-router';

interface Props {
  products: IProductDetail[];
  isLoading: boolean;
}

export const ProductCatalogTable = ({ products, isLoading }: Props) => {
  const { isDeletingProduct, deleteProduct } = useDelete();

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Precio Base</TableHead>
            <TableHead>Variantes</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <img
                  src={product.variants[0]?.images[0] || '/placeholder.jpg'}
                  alt={product.name}
                  className="h-12 w-12 object-cover rounded-md bg-muted"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.variants.length} Colores</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {/* boton de editar */}
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/admin/products/${product._id}/edit`}>
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </Button>

                  {/*boton de eliminar */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          ¿Estás absolutamente seguro?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará permanentemente el producto{' '}
                          <strong>{product.name}</strong>, todas sus variantes y
                          todo su historial de stock.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => deleteProduct(product._id)}
                          disabled={isDeletingProduct}
                        >
                          {isDeletingProduct ? 'Borrando...' : 'Sí, eliminar'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
