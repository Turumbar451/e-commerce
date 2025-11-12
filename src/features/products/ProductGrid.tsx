import type { IProductForCard } from '@/interfaces/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  title: string;
  products: IProductForCard[];
}

export const ProductGrid = ({ title, products }: ProductGridProps) => {
  return (
    <section className=" mx-auto container py-12">
      <h2 className="text-3xl font-bold tracking-tight mb-8">{title}</h2>

      {/* cuadricula adaptable, dos en telefono, 4 en pc*/}
      <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
