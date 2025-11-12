import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Heart, Ruler, ShieldCheck, Star, Truck } from 'lucide-react';
import { toast } from 'sonner'; // De tu stack
import { formatCurrency } from '@/lib/formatters';
//import type { IProductDetail, IProductSize, IProductVariant } from '@/interfaces/product';

//mover las interfaces
interface IProductSize {
  size: string; // "EU 39", "27.5 MX", "M"
  stock: number;
}

interface IProductVariant {
  colorName: string; // "Blanco/Blanco/Blanco"
  colorHex?: string; // "#FFFFFF"
  sku: string; // SKU principal de esta variante de color
  images: string[]; // imagen especificas de este color
  sizes: IProductSize[]; // stock de cada talla para ESTE color
}

export interface IProductDetail {
  _id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number; // precio de oferta
  category: string;

  variants: IProductVariant[];

  description: string;

  details: {
    title: string;
    content: string;
  }[];

  reviews: {
    averageRating: number;
    reviewCount: number;
  };
}

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

// subcomponente: galeria de imagenes

const ProductImageGallery = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* imagen principal*/}
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={mainImage}
          alt="Producto"
          className="h-full w-full object-cover transition-opacity duration-300"
        />
      </div>
      {/* thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`aspect-square w-full overflow-hidden rounded-md bg-gray-100 ring-offset-2 transition-all ${
              mainImage === img
                ? 'ring-2 ring-primary'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// subcomponente: informacion y accion (buy box)
interface ProductInfoProps {
  product: IProductDetail;
  selectedVariant: IProductVariant;
  onVariantChange: (variant: IProductVariant) => void;
  selectedSize: string | null;
  onSizeChange: (size: string | null) => void;
}

const ProductInfoActions = ({
  product,
  selectedVariant,
  onVariantChange,
  selectedSize,
  onSizeChange,
}: ProductInfoProps) => {
  // logica para añadir al carrito
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecciona una talla.');
      return;
    }
    // hook useCart y tanstack
    // const { addItem } = useCart();
    // addItem({ sku: selectedVariant.sku, size: selectedSize, quantity: 1 }); o algo asi nose
    console.log('Añadiendo al carrito:', {
      sku: selectedVariant.sku,
      color: selectedVariant.colorName,
      size: selectedSize,
    });
    toast.success('¡Añadido al carrito!');
  };

  // añadir a favoritos
  const handleAddFavorite = () => {
    // mutacion de favoritos, añadir
    console.log('Añadiendo a favoritos:', product._id);
    toast.info('Añadido a favoritos (simulado)');
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* informacion basica */}
      <p className="text-sm uppercase text-muted-foreground">{product.brand}</p>
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      <div className="flex items-center space-x-2">
        {product.salePrice ? (
          <>
            <p className="text-2xl font-semibold">
              {formatCurrency(product.salePrice)}
            </p>
            <p className="text-lg text-muted-foreground line-through">
              {formatCurrency(product.price)}
            </p>
          </>
        ) : (
          <p className="text-2xl font-semibold">
            {formatCurrency(product.price)}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        <span className="font-medium">{product.reviews.averageRating}</span>
        <span className="text-sm text-muted-foreground">
          ({product.reviews.reviewCount} reseñas)
        </span>
      </div>

      {/* selector de color */}
      <div>
        <h3 className="text-sm font-medium">
          Color:{' '}
          <span className="text-muted-foreground">
            {selectedVariant.colorName}
          </span>
        </h3>
        <RadioGroup
          value={selectedVariant.sku}
          onValueChange={(sku) => {
            const newVariant = product.variants.find((v) => v.sku === sku);
            if (newVariant) onVariantChange(newVariant);
          }}
          className="mt-2 flex space-x-2"
        >
          {product.variants.map((variant) => (
            <RadioGroupItem
              key={variant.sku}
              value={variant.sku}
              id={variant.sku}
              className="h-8 w-8 rounded-full border-2 p-0"
              style={{ backgroundColor: variant.colorHex || 'gray' }}
              aria-label={variant.colorName}
            />
          ))}
        </RadioGroup>
      </div>

      {/* 3. Selector de Talla */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Selecciona tu talla</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" size="sm" className="p-0">
                <Ruler className="mr-1 h-4 w-4" />
                Guía de tallas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Guía de Tallas</DialogTitle>
              </DialogHeader>
              <p>Aquí iría tu contenido de guía de tallas...</p>
            </DialogContent>
          </Dialog>
        </div>

        <ToggleGroup
          type="single"
          value={selectedSize || ''}
          onValueChange={(value) => onSizeChange(value || null)} // Permite deseleccionar
          className="mt-2 grid grid-cols-4 gap-2"
        >
          {selectedVariant.sizes.map((sizeInfo) => (
            <ToggleGroupItem
              key={sizeInfo.size}
              value={sizeInfo.size}
              disabled={sizeInfo.stock === 0}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {sizeInfo.size}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* acciones */}
      <Button size="lg" onClick={handleAddToCart} disabled={!selectedSize}>
        {/* añadir item del useCArt tal vez */}
        {selectedSize ? 'Añadir al carrito' : 'Selecciona una talla'}
      </Button>
      <Button size="lg" variant="outline" onClick={handleAddFavorite}>
        <Heart className="mr-2 h-4 w-4" />
        Añadir a favoritos
      </Button>
    </div>
  );
};

// subcomponente: acordeaon de detalles

const ProductDetailsAccordion = ({ product }: { product: IProductDetail }) => {
  return (
    <Accordion type="multiple" defaultValue={['description']}>
      <AccordionItem value="description">
        <AccordionTrigger>Descripción</AccordionTrigger>
        <AccordionContent className="prose prose-sm">
          {product.description}
        </AccordionContent>
      </AccordionItem>

      {product.details.map((detail) => (
        <AccordionItem value={detail.title} key={detail.title}>
          <AccordionTrigger>{detail.title}</AccordionTrigger>
          <AccordionContent>{detail.content}</AccordionContent>
        </AccordionItem>
      ))}

      <AccordionItem value="shipping">
        <AccordionTrigger>Envíos y Devoluciones</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <h4 className="font-medium">Envío Estándar</h4>
                <p className="text-sm text-muted-foreground">
                  Recibe en 3-5 días hábiles. Envío gratis en pedidos mayores a
                  $999.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <h4 className="font-medium">Devoluciones Fáciles</h4>
                <p className="text-sm text-muted-foreground">
                  Tienes 30 días para devolver el producto sin costo.
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

//COMPONENTE PRINCIPAL

const ProductDetailPage = () => {
  // const { data: product, isLoading, isError } = useQuery({ ... });
  const product = mockProduct; // USAR DATOS SIMULADOS

  // Estado para la VARIANTE (color) seleccionada
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  // Estado para la TALLA seleccionada
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Handler para cambiar de variante (color)
  const handleVariantChange = (variant: IProductVariant) => {
    setSelectedVariant(variant);
    setSelectedSize(null); // ¡Importante! Resetea la talla al cambiar de color
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
