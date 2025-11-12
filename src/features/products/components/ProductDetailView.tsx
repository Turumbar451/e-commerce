import { useProductDetail } from '../hooks/useProductDetail';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductInfoActions } from './ProductInfoActions';
import { ProductDetailsAccordion } from './ProductDetailsAccordion';
import { Spinner } from '@/components/ui/spinner';

//este es el componente que verdaderamente se encarga de mostrar la pagina de PRODUCTO
export const ProductDetailView = () => {
  const {
    product,
    isLoading,
    isError,
    error,
    activeVariant,
    selectedSize,
    onVariantChange,
    onSizeChange,
  } = useProductDetail();

  if (isLoading) {
    return (
      <div className="container mx-auto text-center p-10">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto text-center p-10 text-destructive">
        <p>
          Error al cargar el producto: {error?.message || 'Error desconocido'}
        </p>
      </div>
    );
  }

  //no encontro (diferente al error de cargr)
  if (!product || !activeVariant) {
    return (
      <div className="container mx-auto text-center p-10">
        <p>Producto no encontrado.</p>
      </div>
    );
  }

  // renderizar vista
  return (
    <div className="container mx-auto max-w-6xl p-4 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* columna 1 de imagenes */}
        <div className="lg:col-span-7">
          <ProductImageGallery images={activeVariant.images} />
        </div>

        {/* columna 2 de info y acciones */}
        <div className="lg:col-span-5">
          <ProductInfoActions
            product={product}
            selectedVariant={activeVariant}
            onVariantChange={onVariantChange}
            selectedSize={selectedSize}
            onSizeChange={onSizeChange}
          />
        </div>
      </div>

      {/* seccion de detalles */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Detalles del Producto</h2>
        <ProductDetailsAccordion product={product} />
      </div>
    </div>
  );
};
