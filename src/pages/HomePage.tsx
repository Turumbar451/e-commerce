import { BrandsFooter } from '@/components/common/BrandsFooter';
import { HeroBanners } from '@/components/common/HeroBanner';
import { ProductGrid } from '@/features/products/ProductGrid';
import { Navbar } from '@/components/common/Navbar';
import { useProducts } from '@/features/products/hooks/useProducts';
import { Paginator } from 'src/components/common/Paginator';

export const HomePage = () => {
  const { products, isLoading, isError, isFetching, pagination, currentPage, setCurrentPage } = useProducts();
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
        {pagination && pagination.totalPage > 1 && (
          <div className="container flex justify-center py-8">
             <Paginator currentPage={currentPage} totalPages={pagination.totalPage} onPageChange={setCurrentPage} isFetching={isFetching}
             />
             </div>
        )}
      </main>

      {/*  footer de marcas */}
      <BrandsFooter />
    </div>
  );
};