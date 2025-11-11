import { useState, useEffect } from 'react';
import { useParams } from 'react-router'; // <-- 1. Importar useParams
import { useQuery } from '@tanstack/react-query'; // <-- 2. Importar useQuery
import { getProductById } from '@/services/productService'; // <-- 3. Importar servicio
import type { IProductVariant } from '@/interfaces/product';
import { ProductImageGallery } from '@/features/products/components/ProductImageGallery';
import { ProductInfoActions } from '@/features/products/components/ProductInfoActions';
import { ProductDetailsAccordion } from '@/features/products/components/ProductDetailsAccordion';
// (Aquí también irían los imports de tus componentes de Shadcn)

// (Asumimos que los sub-componentes y las interfaces
// ya están en sus propios archivos)

// --- Componente Principal de la Página ---

const ProductDetailPage = () => {
  // 1. OBTENER EL ID DE LA URL
  // Si tu ruta es /product/:productId, esto obtiene el valor
  const { productId } = useParams<{ productId: string }>();

  // 2. LLAMAR A LA API CON TANSTACK QUERY
  const {
    data: product, // 'data' se renombra a 'product'
    isLoading,
    isError,
    error,
  } = useQuery({
    // queryKey: Clave única. React Query la usa para caché.
    // Si productId cambia, la consulta se vuelve a ejecutar.
    queryKey: ['product', productId],

    // queryFn: La función que trae los datos. ¡Debe retornar una promesa!
    queryFn: () => getProductById(productId!), // '!' le dice a TS que confiamos que productId existe

    // enabled: No intentes ejecutar la consulta si no tenemos un productId
    enabled: !!productId,
  });

  // 3. ESTADO LOCAL PARA SELECCIONES
  // Inician en 'null' porque no hay producto cargado al inicio
  const [selectedVariant, setSelectedVariant] =
    useState<IProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    // 1. ¿Existe el producto?
    // 2. ¿Tiene una propiedad 'variants'?
    // 3. ¿Ese arreglo 'variants' no está vacío?
    if (product && product.variants && product.variants.length > 0) {
      // Si todo se cumple, SÍ es seguro acceder a [0]
      setSelectedVariant(product.variants[0]);
      setSelectedSize(null);
    }
    // Si no se cumple, no hace nada y selectedVariant sigue 'null'.
    // Tu renderizado de más abajo (el 'if (!product || !selectedVariant)')
    // se encargará de mostrar "Producto no encontrado".
  }, [product]);
  // Handler para cambiar de variante (color)
  const handleVariantChange = (variant: IProductVariant) => {
    setSelectedVariant(variant);
    setSelectedSize(null); // Resetea la talla al cambiar de color
  };

  // 5. MANEJO DE ESTADOS DE CARGA Y ERROR
  if (isLoading) {
    return (
      <div className="container mx-auto text-center p-10">
        <p>Cargando producto...</p>
        {/* Aquí puedes poner un <Spinner /> */}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto text-center p-10 text-red-600">
        <p>
          Error al cargar el producto: {error?.message || 'Error desconocido'}
        </p>
      </div>
    );
  }

  // Si 'product' es undefined O 'selectedVariant' es null (aún no se setea el efecto)
  if (!product || !selectedVariant) {
    return (
      <div className="container mx-auto text-center p-10">
        <p>Producto no encontrado.</p>
      </div>
    );
  }

  // 6. RENDERIZADO FINAL (cuando todo está OK)
  return (
    <div className="container mx-auto max-w-6xl p-4 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Columna 1: Imágenes */}
        <div className="lg:col-span-7">
          {/* Le pasamos las imágenes de la variante SELECCIONADA */}
          <ProductImageGallery images={selectedVariant.images} />
        </div>

        {/* Columna 2: Info y Acciones */}
        <div className="lg:col-span-5">
          <ProductInfoActions
            product={product} // El producto completo
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Detalles del Producto</h2>
        <ProductDetailsAccordion product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
