import type { IProductForCard } from '@/interfaces/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  title: string;
  products: IProductForCard[];
}

export const ProductGrid = ({ title, products }: ProductGridProps) => {
  return (
    <section className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <span className="text-sm text-muted-foreground">
          {products.length} productos encontrados
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
