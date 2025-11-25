import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useBrands, useCategories } from '@/features/admin/hooks/useCatalogs';

const PRICE_STEPS = [0, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];

interface ProductFiltersProps {
  activeBrand: string | null;
  setActiveBrand: (brand: string | null) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  minPrice: number | null;
  setMinPrice: (value: number | null) => void;
  maxPrice: number | null;
  setMaxPrice: (value: number | null) => void;
  onReset: () => void;
}

export const ProductFilters = ({
  activeBrand,
  setActiveBrand,
  activeCategory,
  setActiveCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onReset,
}: ProductFiltersProps) => {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  const brandValue = activeBrand ?? 'all';
  const categoryValue = activeCategory ?? 'all';
  const minPriceValue = minPrice !== null ? String(minPrice) : 'none';
  const maxPriceValue = maxPrice !== null ? String(maxPrice) : 'none';

  const handleMinPriceChange = (value: string) => {
    if (value === '' || value === 'none') {
      setMinPrice(null);
      return;
    }
    setMinPrice(Number(value));
  };

  const handleMaxPriceChange = (value: string) => {
    if (value === '' || value === 'none') {
      setMaxPrice(null);
      return;
    }
    setMaxPrice(Number(value));
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 min-w-[180px]">
          <Label>Marca</Label>
          <Select
            value={brandValue}
            onValueChange={(value) =>
              setActiveBrand(value === 'all' ? null : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todas las marcas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {brands?.map((brand) => (
                <SelectItem key={brand._id} value={brand.slug}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1 min-w-[180px]">
          <Label>Categoría</Label>
          <Select
            value={categoryValue}
            onValueChange={(value) =>
              setActiveCategory(value === 'all' ? null : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category._id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 min-w-[220px]">
          <Label>Rango de precio</Label>
          <div className="flex gap-2">
            <Select
              value={minPriceValue}
              onValueChange={handleMinPriceChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Mín" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin mín</SelectItem>
                {PRICE_STEPS.map((price) => (
                  <SelectItem key={price} value={String(price)}>
                    ${price.toLocaleString('es-MX')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={maxPriceValue}
              onValueChange={handleMaxPriceChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Máx" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin máx</SelectItem>
                {PRICE_STEPS.map((price) => (
                  <SelectItem key={price} value={String(price)}>
                    ${price.toLocaleString('es-MX')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            Limpiar filtros
          </Button>
        </div>
      </div>
    </section>
  );
};
