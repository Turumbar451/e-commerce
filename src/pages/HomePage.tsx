import { BrandsFooter } from '@/components/common/BrandsFooter';
import { HeroBanners } from '@/components/common/HeroBanner';
import { ProductGrid } from '@/features/products/ProductGrid';
import { Paginator } from '@/components/common/Paginator'; // 1. Importar
import { Navbar } from '@/components/common/Navbar';
import { useProducts } from '@/features/products/hooks/useProducts';

export const HomePage = () => {
  const {
    products,
    isLoading,
    isError,
    pagination, // <--- Necesario
    currentPage, // <--- Necesario
    setCurrentPage, // <--- Necesario
    isFetching,
  } = useProducts();
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex-col flex grow">
        <HeroBanners />
        {isLoading && (
          <div className="container py-12 text-center">
            Cargando productos...
          </div>
        )}

        {isError && (
          <div className="container py-12 text-center text-destructive">
            Error al cargar los productos.
          </div>
        )}

        {/* renderizar cuadricula si no hay error*/}
        {products && <ProductGrid title="Novedades" products={products} />}
        {pagination && pagination.totalPages > 1 && (
          <div className="py-8 flex justify-center">
            <Paginator
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll al inicio
              }}
              isFetching={isFetching}
            />
          </div>
        )}
      </main>

      {/*  footer de marcas */}
      <BrandsFooter />
    </div>
  );
};
