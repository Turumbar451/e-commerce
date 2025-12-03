import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { BrandsFooter } from '@/components/common/BrandsFooter';
import { HeroBanners } from '@/components/common/HeroBanner';
import { ProductGrid } from '@/features/products/ProductGrid';
import { Paginator } from '@/components/common/Paginator'; // 1. Importar
import { Navbar } from '@/components/common/Navbar';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductFilters } from '@/features/products/components/ProductFilters';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type HomePageProps = {
  targetGender?: 'H' | 'M' | 'N';
};

export const HomePage = ({ targetGender }: HomePageProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const brandQuery = searchParams.get('brand');

  console.log('HomePage - searchQuery:', searchQuery); // Debug

  const {
    products,
    isLoading,
    isError,
    pagination, // <--- Necesario
    currentPage, // <--- Necesario
    setCurrentPage, // <--- Necesario
    isFetching,
    activeBrand,
    setActiveBrand,
    activeCategory,
    setActiveCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useProducts(null, targetGender ?? null, searchQuery, brandQuery);

  console.log('HomePage - products:', products); // Debug
  console.log('HomePage - isLoading:', isLoading); // Debug
  console.log('HomePage - isError:', isError); // Debug

  useEffect(() => {
    const handler = () => setIsFiltersOpen(true);
    window.addEventListener('open-product-filters', handler);
    return () => window.removeEventListener('open-product-filters', handler);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-background text-foreground">
      <Navbar />

      <main className="flex-col flex grow">
        <HeroBanners />
        <div className="container flex justify-end py-4">
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetContent
              side="left"
              className="w-full sm:w-[360px] px-5 py-6 space-y-4"
            >
              <SheetHeader>
                <SheetTitle>Filtrar productos</SheetTitle>
              </SheetHeader>
              <div className="mt-2">
                <ProductFilters
                  activeBrand={activeBrand}
                  setActiveBrand={(value) => {
                    setActiveBrand(value);
                    setCurrentPage(1);
                  }}
                  activeCategory={activeCategory}
                  setActiveCategory={(value) => {
                    setActiveCategory(value);
                    setCurrentPage(1);
                  }}
                  minPrice={minPrice}
                  setMinPrice={(value) => {
                    setMinPrice(value);
                    setCurrentPage(1);
                  }}
                  maxPrice={maxPrice}
                  setMaxPrice={(value) => {
                    setMaxPrice(value);
                    setCurrentPage(1);
                  }}
                  onReset={() => {
                    setActiveBrand(null);
                    setActiveCategory(null);
                    setMinPrice(null);
                    setMaxPrice(null);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
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
                //window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll al inicio
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
