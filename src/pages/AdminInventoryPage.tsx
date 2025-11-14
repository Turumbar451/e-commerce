import { useMemo } from 'react';
import { StatCard } from '@/features/admin/components/StatCard';
import {
  ProductDataTable,
  type InventoryItem,
} from '@/features/admin/components/ProductDataTable';
import { useAdminProducts } from '@/features/admin/hooks/useAdminProducts';
import { Spinner } from '@/components/ui/spinner';
import { Boxes, PackageX, Tag } from 'lucide-react';

const AdminInventoryPage = () => {
  const { products, isLoading } = useAdminProducts();

  const inventoryItems: InventoryItem[] = useMemo(() => {
    // aplanar data
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

  const kpis = useMemo(() => {
    const totalItems = inventoryItems.length;
    const onSaleCount = products.filter(
      (p) => p.salePrice && p.salePrice > 0
    ).length;
    const lowStockCount = inventoryItems.filter(
      (item) => item.status === 'Bajo'
    ).length;
    const noStockCount = inventoryItems.filter(
      (item) => item.status === 'Agotado'
    ).length;

    return { totalItems, onSaleCount, lowStockCount, noStockCount };
  }, [products, inventoryItems]);

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
          value={isLoading ? loadingValue : kpis.totalItems.toString()}
          icon={<Boxes className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Productos en Oferta (Modelos)"
          value={isLoading ? loadingValue : kpis.onSaleCount.toString()}
          icon={<Tag className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Bajo Stock (< 10)"
          value={isLoading ? loadingValue : kpis.lowStockCount.toString()}
          icon={<PackageX className="h-4 w-4 text-destructive" />}
          variant="destructive"
        />
        <StatCard
          title="Sin Stock"
          value={isLoading ? loadingValue : kpis.noStockCount.toString()}
          icon={<PackageX className="h-4 w-4 text-destructive" />}
          variant="destructive"
        />
      </div>

      <ProductDataTable
        items={inventoryItems}
        isLoading={isLoading}
        isError={false}
      />
    </div>
  );
};

export default AdminInventoryPage;
