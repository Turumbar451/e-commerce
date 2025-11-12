import { Navbar } from '@/components/common/Navbar';
import { BrandsFooter } from '@/components/common/BrandsFooter';
import { ProductDetailView } from '@/features/products/components/ProductDetailView';

const ProductDetailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <ProductDetailView />
      </main>
      <BrandsFooter />
    </div>
  );
};

export default ProductDetailPage;
