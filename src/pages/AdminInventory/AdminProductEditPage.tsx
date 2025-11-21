import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/services/productService'; // reutilizar el servicio existente
import { ProductForm } from '@/features/admin/components/ProductForm';
import { Spinner } from '@/components/ui/spinner';

const AdminProductEditPage = () => {
  const { id } = useParams<{ id: string }>();

  // datos del producto
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id], //guarda datos en produt+id
    queryFn: () => getProductById(id!), //los datos obtenidos de esta funcion que es la que me traer todo el producto por id
    enabled: !!id, //solo se ejecuta si id existe
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center p-10 text-destructive">
        Error al cargar el producto
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Editar Producto</h1>
        <p className="text-muted-foreground">
          Modifica los detalles del producto: {product.name}
        </p>
      </div>

      {/*mismo formulario pero con los datos*/}
      <ProductForm productToEdit={product} />
    </div>
  );
};

export default AdminProductEditPage;
