import { ProductForm } from '@/features/admin/components/ProductForm';

const AdminProductFormPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Crear Nuevo Producto
        </h1>
        <p className="text-muted-foreground">
          Completa todos los campos para añadir un producto al inventario.
        </p>
      </div>

      {/* este es el verdadero forumulario */}
      <ProductForm />
    </div>
  );
};

export default AdminProductFormPage;
