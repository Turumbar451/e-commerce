import { BrandsFooter } from '@/components/common/BrandsFooter';
import { HeroBanners } from '@/components/common/HeroBanner';
import { ProductGrid } from '@/features/products/ProductGrid';
import { Navbar } from '@/components/common/Navbar';
import { type IProduct } from '@/interfaces/product';

// data falsa, se manejara con tanstack query
const sampleProducts: IProduct[] = [
  {
    id: '1',
    name: 'Bota Britton Road de piel',
    brand: 'Timberland',
    price: 3499,
    imageUrl: '/negro.jpg',
    stock: 10,
  },
  {
    id: '2',
    name: 'Bota The North Face para outdoor',
    brand: 'The North Face',
    price: 2790,
    imageUrl: '/negro.jpg',
    stock: 10,
  },
  {
    id: '3',
    name: 'Bota W25 de piel',
    brand: 'Hugo',
    price: 4999,
    imageUrl: '/negro.jpg',
    stock: 10,
  },
  {
    id: '4',
    name: 'Bota de montañismo',
    brand: 'Under Armour',
    price: 3499,
    imageUrl: '/negro.jpg',
    stock: 10,
  },
  {
    id: '5',
    name: 'Bota Clásica Marrón',
    brand: 'Flexi',
    price: 1999,
    imageUrl: '/negro.jpg',
    stock: 10,
  },
  {
    id: '6',
    name: 'Botín Azul Marino',
    brand: 'Clarks',
    price: 2899,
    imageUrl: '/negro.jpg',
    stock: 10,
  },
  {
    id: '7',
    name: 'Bota Vaquera Piel',
    brand: 'Cuadra',
    price: 5200,
    imageUrl: '/negro.jpg',
    stock: 10,
  },
  {
    id: '8',
    name: 'Borcego Táctico',
    brand: '5.11',
    price: 3100,
    imageUrl: '/negro.jpg',
    stock: 10,
  },
];

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex-col flex grow">
        <HeroBanners />
        {/*  cuadricula de productos */}
        <ProductGrid title="Novedades para Él" products={sampleProducts} />

        {/* por si añaidmos secciones */}
        <ProductGrid
          title="Lo más Visto"
          products={sampleProducts.slice(4, 8)}
        />
      </main>

      {/*  footer de marcas */}
      <BrandsFooter />
    </div>
  );
};
