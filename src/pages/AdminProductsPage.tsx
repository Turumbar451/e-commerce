import { Button } from '@/components/ui/button';
import { ProductCatalogTable } from '@/features/admin/components/ProductCatalogTable';
import { useAdminProducts } from '@/features/admin/hooks/useAdminProducts';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { Link } from 'react-router';

const AdminProductsPage = () => {
  const { products, isLoading, pagination, page, setPage } = useAdminProducts();
  return (
    <div className="container mx-auto">
      {' '}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo</h1>
          <p className="text-muted-foreground">
            Gestión general de modelos y productos.
          </p>
        </div>

        {/* boton para agregar nuevo producto */}
        <Button asChild>
          <Link to="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Link>
        </Button>
      </div>
      {/* tabla, importante */}
      <ProductCatalogTable products={products} isLoading={isLoading} />
      {/* paginacion al igual que en inventario */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <span className="text-sm text-muted-foreground">
          Página {pagination?.currentPage || 1} de {pagination?.totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => p + 1)}
          disabled={!pagination || page === pagination.totalPages || isLoading}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdminProductsPage;
