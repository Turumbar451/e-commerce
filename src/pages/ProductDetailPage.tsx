import { useState } from 'react';
import type { IProductDetail, IProductVariant } from '@/interfaces/product';
import { ProductImageGallery } from '@/features/products/components/ProductImageGallery';
import { ProductInfoActions } from '@/features/products/components/ProductInfoActions';
import { ProductDetailsAccordion } from '@/features/products/components/ProductDetailsAccordion';

// MOCK DATA
const mockProduct: IProductDetail = {
  _id: '12345',
  name: 'Botas de Montaña Impermeables',
  brand: 'AventuraPro',
  price: 2899.0,
  salePrice: 2499.0,
  category: 'Calzado',
  description:
    'Conquista cualquier sendero con las botas AventuraPro. Diseñadas para la máxima durabilidad y confort, cuentan con tecnología impermeable y una suela de agarre superior para terrenos difíciles.',
  reviews: {
    averageRating: 4.8,
    reviewCount: 132,
  },
  variants: [
    {
      colorName: 'Marrón Coyote',
      colorHex: '#8D6E63',
      sku: 'AP-BOTA-COY-01',
      images: [
        'https://via.placeholder.com/600x600/8D6E63/FFFFFF.png?text=Bota+Marrón+1',
        'https://via.placeholder.com/600x600/8D6E63/FFFFFF.png?text=Bota+Marrón+2',
        'https://via.placeholder.com/600x600/8D6E63/FFFFFF.png?text=Bota+Marrón+3',
        'https://via.placeholder.com/600x600/8D6E63/FFFFFF.png?text=Bota+Marrón+4',
      ],
      sizes: [
        { size: '26 MX', stock: 5 },
        { size: '27 MX', stock: 2 },
        { size: '28 MX', stock: 0 },
        { size: '29 MX', stock: 8 },
      ],
    },
    {
      colorName: 'Negro Táctico',
      colorHex: '#212121',
      sku: 'AP-BOTA-BLK-01',
      images: [
        'https://via.placeholder.com/600x600/212121/FFFFFF.png?text=Bota+Negra+1',
        'https://via.placeholder.com/600x600/212121/FFFFFF.png?text=Bota+Negra+2',
        'https://via.placeholder.com/600x600/212121/FFFFFF.png?text=Bota+Negra+3',
      ],
      sizes: [
        { size: '26 MX', stock: 3 },
        { size: '27 MX', stock: 10 },
        { size: '28 MX', stock: 12 },
        { size: '29 MX', stock: 1 },
      ],
    },
  ],
  details: [
    { title: 'Material Superior', content: 'Piel sintética y malla' },
    { title: 'Suela', content: 'Goma de alta tracción' },
    { title: 'Tecnología', content: 'Impermeable (Waterproof)' },
    { title: 'Tipo de cierre', content: 'Agujetas' },
  ],
};

//COMPONENTE PRINCIPAL

const ProductDetailPage = () => {
  // const { data: product, isLoading, isError } = useQuery({ ... });
  const product = mockProduct; // USAR DATOS SIMULADOS

  // estado para la VARIANTE (color) seleccionada
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  // Estado para la TALLA seleccionada
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Handler para cambiar de variante (color)
  const handleVariantChange = (variant: IProductVariant) => {
    setSelectedVariant(variant);
    setSelectedSize(null); // yesetea la talla al cambiar de color
  };

  // if (isLoading) return <div>Cargando...</div>;
  // if (isError) return <div>Error al cargar el producto</div>;
  // if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="container mx-auto max-w-6xl p-4 mt-8">
      {/* layout prinicpal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* columna1: imagenes */}
        <div className="lg:col-span-7">
          <ProductImageGallery images={selectedVariant.images} />
        </div>

        {/* columna2: info y acciones */}
        <div className="lg:col-span-5">
          <ProductInfoActions
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />
        </div>
      </div>

      {/* seccion secundaria: detalles */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Detalles del Producto</h2>
        <ProductDetailsAccordion product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
