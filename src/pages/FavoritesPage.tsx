import { useFavorites } from '@/features/favorites/hooks/useFavorites';
import { Navbar } from '@/components/common/Navbar';
import { Spinner } from '@/components/ui/spinner';
// (Necesitarás un hook para cargar los productos basados en los SKUs, 
// o modificar el backend para que devuelva los productos completos)

const FavoritesPage = () => {
  const { favoriteSKUs, isLoadingFavorites } = useFavorites();

  // NOTA: 'favoriteSKUs' es solo un array de strings (ej: ["AMAX-41-BLK"]).
  // Necesitarás otro hook (ej. 'useProductsBySKUs') para obtener 
  // los detalles completos de esos productos y poder renderizarlos.
  // Por ahora, solo mostraremos los SKUs.

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Mis Favoritos</h1>
        
        {isLoadingFavorites ? (
          <div className="flex items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : favoriteSKUs.length === 0 ? (
          <p>No tienes favoritos guardados.</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {/* Aquí iría el mapeo de los productos completos.
              Temporalmente, mostramos los SKUs:
            */}
            {favoriteSKUs.map(sku => (
              <div key={sku} className="border p-4 rounded">
                <p>Producto SKU: {sku}</p>
                <p>(Aquí iría el ProductCard)</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;