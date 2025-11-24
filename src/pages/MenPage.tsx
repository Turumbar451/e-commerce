import { BrandsFooter } from '@/components/common/BrandsFooter';
import { HeroBanners } from '@/components/common/HeroBanner';
import { ProductGrid } from '@/features/products/ProductGrid';
import { Navbar } from '@/components/common/Navbar';
import { useProducts } from '@/features/products/hooks/useProducts';
import { Paginator } from '@/components/common/Paginator'; // O la ruta relativa correcta '../components...'

export const MenPage = () => {
  // AQUÍ ESTÁ LA MAGIA: Pedimos solo productos de 'Hombres'
  // Asegúrate que en tu base de datos la categoría se llame exactamente así (mayúsculas/minúsculas importan)
  const { 
    products, 
    isLoading, 
    isError, 
    isFetching, 
    pagination, 
    currentPage, 
    setCurrentPage 
  } = useProducts('Hombres'); 

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex-col flex grow">
        <HeroBanners />
        
        {isLoading && (
          <div className="container py-12 text-center">Cargando categoría Hombres...</div>
        )}

        {isError && (
          <div className="container py-12 text-center text-destructive">Error al cargar productos.</div>
        )}

        {products && <ProductGrid title="Hombres" products={products} />}

        {pagination && pagination.totalPages > 1 && (
          <div className="container flex justify-center py-8">
             <Paginator 
               currentPage={currentPage} 
               totalPages={pagination.totalPages} 
               onPageChange={setCurrentPage} 
               isFetching={isFetching}
             />
          </div>
        )}
      </main>

      <BrandsFooter />
    </div>
  );
};