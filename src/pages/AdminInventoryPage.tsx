import { useMemo } from 'react';
import { StatCard } from '@/features/admin/components/StatCard';
import {
  ProductDataTable,
  type InventoryItem,
} from '@/features/admin/components/ProductDataTable';
import { useAdminProducts } from '@/features/admin/hooks/useAdminProducts';
import { useAdminInventoryStats } from '@/features/admin/hooks/useAdminInventoryStats';
import { Spinner } from '@/components/ui/spinner';
import { Boxes, PackageX, Tag } from 'lucide-react';

const AdminInventoryPage = () => {
  //tabla
  const {
    products,
    isLoading: isLoadingTable,
    isError: isErrorTable,
  } = useAdminProducts();

  // tarjetas
  const { stats, isLoadingStats } = useAdminInventoryStats();

  const inventoryItems: InventoryItem[] = useMemo(() => {
    return products.flatMap((product) =>
      product.variants.flatMap((variant) =>
        variant.sizes.map((size) => ({
          id: `${product._id}-${variant.sku}-${size.size}`,
          name: product.name,
          variantName: variant.colorName,
          sku: variant.sku,
          size: size.size,
          stock: size.stock,
          price: product.salePrice || product.price,
          imageUrl: variant.images[0] || '/placeholder-shoe.jpg',
          status:
            size.stock === 0 ? 'Agotado' : size.stock < 10 ? 'Bajo' : 'Óptimo',
        }))
      )
    );
  }, [products]);

  const loadingValue = <Spinner className="h-5 w-5" />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Inventario
        </h1>
      </div>

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
      </div>

      <ProductDataTable
        items={inventoryItems}
        isLoading={isLoadingTable}
        isError={isErrorTable}
      />
    </div>
  );
};

export default AdminInventoryPage;
