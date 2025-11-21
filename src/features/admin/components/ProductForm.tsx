import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  ProductFormProvider,
  useProductFormContext,
} from '../context/ProductFormContext';

import { ProductVariantsCard } from './form/ProductVariantsCard';
import { ProductDetailsCard } from './form/ProductDetailCard';
import { ProductPricingCard } from './form/ProductPricingCart';
import type { IProductDetail } from '@/interfaces/product';

const ProductFormContent = () => {
  const { handleSubmit, isUploading, isSaving, isEditMode } =
    useProductFormContext();

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* COLUMNA iaquierda */}
      <div className="lg:col-span-2 space-y-6">
        <ProductDetailsCard />
        <ProductVariantsCard />
      </div>

      {/*columna derecha */}
      <div className="lg:col-span-1 space-y-6">
        <ProductPricingCard />

        {/* añadir mas tarjetas de estado, etc */}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isUploading || isSaving}
        >
          {isSaving && <Spinner className="mr-2" />}
          {isSaving
            ? 'Guardando...'
            : isEditMode
            ? 'Guardar Cambios'
            : 'Crear Producto'}
        </Button>
      </div>
    </form>
  );
};

export const ProductForm = ({
  productToEdit,
}: {
  productToEdit?: IProductDetail;
}) => {
  return (
    <ProductFormProvider productToEdit={productToEdit}>
      <ProductFormContent />
    </ProductFormProvider>
  );
};
