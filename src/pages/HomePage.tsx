import { BrandsFooter } from '@/components/common/BrandsFooter';
import { HeroBanners } from '@/components/common/HeroBanner';
import { ProductGrid } from '@/features/products/ProductGrid';
import { Navbar } from '@/components/common/Navbar';
import { useProducts } from '@/features/products/hooks/useProducts';

export const HomePage = () => {
  const { products, isLoading, isError } = useProducts();
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
      </main>

      {/*  footer de marcas */}
      <BrandsFooter />
    </div>
  );
};
