// src/features/products/ProductCard.tsx
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { IProduct } from '@/interfaces/product';
import { Heart } from 'lucide-react'; // Icono de Favoritos
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface ProductCardProps {
  product: IProduct;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value);
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el link se active
    toast.warning('Inicia sesión para guardar favoritos', {
      description: 'Necesitas una cuenta para crear tu lista de deseos.',
      position: 'bottom-right',
      action: {
        label: 'Iniciar Sesión',
        onClick: () => navigate('/login'), // 5. Redirigir al hacer clic
      },
    });
  };

  return (
    // La tarjeta entera es un link a la página de detalle del producto
    <a href={`/product/${product.id}`} className="group block">
      <Card className="border-none shadow-none rounded-lg overflow-hidden bg-transparent">
        <CardContent className="p-0 relative">
          {/* imagen del Producto */}
          <div className="aspect-square w-full overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* favoritos boton */}
          <button
            onClick={handleFavoriteClick}
            className=" cursor-pointer absolute top-3 right-3 p-2 bg-background rounded-full shadow-md text-muted-foreground hover:text-red-500 hover:bg-secondary transition-colors"
            aria-label="Añadir a favoritos"
          >
            <Heart className="w-5 h-5" />
          </button>
        </CardContent>

        <CardFooter className="flex flex-col items-start p-4 pt-3">
          {/* marca */}
          <span className="text-sm uppercase font-semibold text-gray-500 tracking-wider">
            {product.brand}
          </span>

          {/* nombre del producto */}
          <h3 className="font-medium text-base text-gray-800 mt-1">
            {product.name}
          </h3>

          {/* Precio */}
          <p className="font-bold text-lg text-gray-900 mt-1">
            {formatCurrency(product.price)}
          </p>
        </CardFooter>
      </Card>
    </a>
  );
};
