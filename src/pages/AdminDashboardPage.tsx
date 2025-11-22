import { StatCard } from '@/features/admin/components/StatCard';
import { useAdminInventoryStats } from '@/features/admin/hooks/useAdminInventoryStats';
import { Boxes, PackageX, Tag } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

const AdminDashboardPage = () => {
  const { stats, isLoadingStats } = useAdminInventoryStats();
  const loadingValue = <Spinner className="h-5 w-5" />;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Items de Inventario (SKU/Talla)"
          value={isLoadingStats ? loadingValue : stats.totalItems.toString()}
          icon={<Boxes className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Productos en Oferta (Modelos)"
          value={isLoadingStats ? loadingValue : stats.onSaleCount.toString()}
          icon={<Tag className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Bajo Stock (< 10)"
          value={isLoadingStats ? loadingValue : stats.lowStockCount.toString()}
          icon={<PackageX className="h-4 w-4 text-destructive" />}
          variant="destructive"
        />
        <StatCard
          title="Sin Stock"
          value={isLoadingStats ? loadingValue : stats.noStockCount.toString()}
          icon={<PackageX className="h-4 w-4 text-destructive" />}
          variant="destructive"
        />
        {/* //! faltan KPIs */}
      </div>
      {/* //! mas vendidos faltan */}
    </div>
  );
};

export default AdminDashboardPage;
