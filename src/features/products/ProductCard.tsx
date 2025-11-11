import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/features/cart/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import type { IProductForCard } from '@/interfaces/product';

interface ProductCardProps {
  product: IProductForCard;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value);
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { performAuthenticatedAction } = useAuthenticatedAction(); // hook para hacer algo si es que esta autenticado
  const { addItem, isAddingItem } = useCart(); // 2. Usar el hook

  const handleAddFavorite = () => {
    //! aqui ira tanstack query y posiblemente debamos crear un hoook para esto
    console.log('Añadiendo a favoritos:', product.id);
    toast.success('¡Añadido a favoritos!');
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // evita que el link se active
    performAuthenticatedAction(
      handleAddFavorite, // es lo que se ejecutara si esta loggeado,la paso como referencia
      'Inicia sesión para guardar favoritos' //este sera el mensaje del sonner si no
    );
  };

  const handleAddToCart = () => {
    // NOTA: El backend espera un SKU. Tu 'IProduct' debe tener
    // acceso al SKU. Usaré 'product.id' como placeholder,
    // ¡asegúrate de usar el SKU real de la variante seleccionada!
    const skuSeleccionado = product.id; // <-- CAMBIA ESTO por el SKU real

    addItem({ sku: skuSeleccionado, cantidad: 1 });
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita navegar
    performAuthenticatedAction(
      handleAddToCart,
      'Inicia sesión para añadir al carrito'
    );
  };

  return (
    // La tarjeta entera es un link a la pagina de detalle del producto
    <a href={`/product/${product.id}`} className="group block">
      <Card className="border-none shadow-none rounded-lg overflow-hidden bg-transparent">
        <CardContent className="p-0 relative">
          {/* imagen del producto */}
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

          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={handleCartClick}
            disabled={isAddingItem}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isAddingItem ? 'Añadiendo...' : 'Añadir al carrito'}
          </Button>
          {/* ------------------------------------------- */}
        </CardFooter>
      </Card>
    </a>
  );
};
