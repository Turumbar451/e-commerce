import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router';

const AdminProductsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Productos del Catálogo
        </h1>

        {/* boton que lleva al formulario para agregar */}
        <Button asChild>
          <Link to="/admin/products/new">
            {' '}
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Nuevo Producto
          </Link>
        </Button>
      </div>

      <div className="p-4 border rounded-md text-muted-foreground">
        (Próximamente: Tabla de Productos del Catálogo)
      </div>
    </div>
  );
};

export default AdminProductsPage;
