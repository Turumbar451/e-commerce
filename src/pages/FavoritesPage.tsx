import { useFavorites } from '@/features/favorites/hooks/useFavorites';
import { Navbar } from '@/components/common/Navbar';
import { Spinner } from '@/components/ui/spinner';
import { ProductCard } from '@/features/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { HeartOff } from 'lucide-react';
import type { IProductForCard } from '@/interfaces/product';

const FavoritesPage = () => {
  const { favoriteProducts, isLoadingFavorites } = useFavorites();

  // Mapeamos los datos "populados" del backend a la interfaz de la tarjeta
  // Nota: El backend devuelve el objeto completo del producto en el array 'favoriteProducts'
  const mappedProducts: IProductForCard[] = favoriteProducts.map((item: any) => ({
    id: item._id,
    name: item.name,
    price: item.salePrice || item.price,
    brand: item.brand,
    // Tomamos la primera imagen de la primera variante como portada
    imageUrl: item.variants?.[0]?.images?.[0] || '/placeholder-shoe.jpg',
    sku: item.variants?.[0]?.sku || 'SKU-UNKNOWN'
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="grow container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mis Favoritos</h1>
        
        {isLoadingFavorites ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner className="h-10 w-10 text-primary" />
          </div>
        ) : mappedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted/30 p-6 rounded-full mb-4">
              <HeartOff className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No tienes favoritos aún</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Guarda los productos que te gustan para comprarlos más tarde.
            </p>
            <Button asChild>
              <Link to="/">Explorar productos</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mappedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;