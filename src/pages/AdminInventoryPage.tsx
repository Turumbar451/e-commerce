import { Button } from '@/components/ui/button';
import { StatCard } from '@/features/admin/components/StatCard';
import { ProductDataTable } from '@/features/admin/components/ProductDataTable';
import { Package, PackageX, PlusCircle, Tag } from 'lucide-react';

// Esta es tu página principal del panel de inventario
const AdminInventoryPage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* 1. Encabezado y Acción Principal */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Inventario
        </h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Nuevo Producto
        </Button>
      </div>

      {/* 2. Tarjetas de Resumen (KPIs) - Inspirado en tus ejemplos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Productos Totales"
          value="1,284"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Productos en Oferta"
          value="72"
          icon={<Tag className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Bajo Stock (< 5)"
          value="19"
          icon={<PackageX className="h-4 w-4 text-destructive" />}
          variant="destructive"
        />
        <StatCard
          title="Sin Stock"
          value="5"
          icon={<PackageX className="h-4 w-4 text-destructive" />}
          variant="destructive"
        />
      </div>

      {/* 3. Tabla de Productos (Componente principal) */}
      <ProductDataTable />
    </div>
  );
};

export default AdminInventoryPage;
