import { StatCard } from '@/features/admin/components/StatCard';
import { ProductDataTable } from '@/features/admin/components/ProductDataTable';
import { Boxes, PackageX, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useAdminInventory } from '@/features/admin/hooks/useAdminInventory';
import { Button } from '@/components/ui/button';
import { useAdminInventoryStats } from '@/features/admin/hooks/useAdminInventoryStats';

const AdminInventoryPage = () => {
  const { stats, isLoadingStats, isErrorStats } = useAdminInventoryStats(); //kpis

  const {
    inventoryItems,
    pagination,
    page,
    isLoadingTable,
    isErrorTable,
    handlePrevPage,
    handleNextPage,
  } = useAdminInventory(); //tabla general

  const isLoading = isLoadingStats || isLoadingTable;
  const isError = isErrorStats || isErrorTable;

  const loadingValue = <Spinner className="h-5 w-5" />;

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Inventario
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Items de Inventario (SKU/Talla)"
          value={isLoading ? loadingValue : stats.totalItems.toString()}
          icon={<Boxes className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Productos en Oferta (Modelos)"
          value={isLoading ? loadingValue : stats.onSaleCount.toString()}
          icon={<Tag className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Bajo Stock (< 10)"
          value={isLoading ? loadingValue : stats.lowStockCount.toString()}
          icon={<PackageX className="h-4 w-4 text-destructive" />}
          variant="destructive"
        />
        <StatCard
          title="Sin Stock"
          value={isLoading ? loadingValue : stats.noStockCount.toString()}
          icon={<PackageX className="h-4 w-4 text-destructive" />}
          variant="destructive"
        />
      </div>

      <ProductDataTable
        items={inventoryItems}
        isLoading={isLoading}
        isError={isError}
      />

      <div className="flex items-center justify-end space-x-2 py-4">
        <span className="text-sm text-muted-foreground">
          Página {pagination?.currentPage || 1} de {pagination?.totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={page === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!pagination || page === pagination.totalPages || isLoading}
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdminInventoryPage;
