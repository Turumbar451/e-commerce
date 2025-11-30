import { ProductDataTable } from '@/features/admin/components/ProductDataTable';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdminInventory } from '@/features/admin/hooks/useAdminInventory';
import { Button } from '@/components/ui/button';
import { useAdminInventoryStats } from '@/features/admin/hooks/useAdminInventoryStats';
import { useDelete } from '@/features/admin/hooks/useDelete';

const AdminInventoryPage = () => {
  const { isLoadingStats, isErrorStats } = useAdminInventoryStats(); //kpis

  const {
    inventoryItems,
    pagination,
    page,
    isLoadingTable,
    isErrorTable,
    handlePrevPage,
    handleNextPage,

    handleAdjustStock,
  } = useAdminInventory(); //tabla general

  const { deleteSize, isDeletingSize } = useDelete(); //eliminar talla

  const isLoading = isLoadingStats || isLoadingTable;
  const isError = isErrorStats || isErrorTable;

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Inventario
        </h1>
      </div>

      <ProductDataTable
        items={inventoryItems}
        isLoading={isLoading}
        isError={isError}
        onAdjustStock={handleAdjustStock}
        onDeleteSize={deleteSize}
        isDeletingSize={isDeletingSize}
      />

      <div className="sticky bottom-0 bg-background/95 backdrop-blur py-4 border-t mt-auto flex items-center justify-end space-x-2 z-10">
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
