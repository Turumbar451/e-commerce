import { useBrands } from '@/features/admin/hooks/useCatalogs';
import { Link } from 'react-router-dom';

const FALLBACK_BRANDS = [
  { name: 'Adidas', slug: 'adidas', logoUrl: '/logos/adidas.svg' },
  { name: 'Puma', slug: 'puma', logoUrl: '/logos/puma.svg' },
  { name: 'Nike', slug: 'nike', logoUrl: '/logos/nike.svg' },
  { name: 'New Balance', slug: 'new-balance', logoUrl: '/logos/new-balance.svg' },
  { name: 'Reebok', slug: 'reebok', logoUrl: '/logos/reebok.svg' },
  { name: 'Pirma', slug: 'pirma', logoUrl: '/logos/pirma.svg' },
];

const logoMap = new Map(FALLBACK_BRANDS.map((brand) => [brand.slug, brand.logoUrl]));

const buildLogoUrl = (slug: string) =>
  logoMap.get(slug) ?? `/logos/${slug}.svg`;

//en este footer estan las marcas
export const BrandsFooter = () => {
  const { data, isLoading, isError } = useBrands();

  const brandsToShow = (data && data.length > 0 ? data : FALLBACK_BRANDS).map(
    (brand) => ({
      name: brand.name,
      slug: brand.slug,
      logoUrl: 'logoUrl' in brand && brand.logoUrl ? brand.logoUrl : buildLogoUrl(brand.slug),
    })
  );

  return (
    <footer className=" mx-auto border-t bg-background mt-12">
      <div className="container py-12">
        <div className="flex flex-col gap-2 mb-6 text-center">
          <p className="text-sm text-muted-foreground">
          </p>
          {isError && (
            <p className="text-xs text-destructive">
              No pudimos cargar las marcas desde el servidor. Mostrando una lista
              de referencia.
            </p>
          )}
        </div>

        {/* Seccion de Logos */}
        {isLoading ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`brand-skeleton-${index}`}
                className="h-10 w-full bg-muted/50 rounded-md animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {brandsToShow.map((brand) => (
              <Link
                key={brand.slug}
                to={`/?brand=${brand.slug}`}
                className="block focus:outline-none focus-visible:ring focus-visible:ring-primary/40 rounded"
                aria-label={`Ver productos de ${brand.name}`}
              >
                <img
                  src={brand.logoUrl}
                  alt={`Logo de ${brand.name}`}
                  loading="lazy"
                  className="h-8 md:h-10 w-auto mx-auto filter grayscale opacity-60
                             transition-all duration-300 hover:opacity-100 hover:filter-none
                             dark:invert dark:brightness-0 dark:contrast-200"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = '/logos/default.svg';
                  }}
                  title={`Filtrar por ${brand.name}`}
                />
              </Link>
            ))}
          </div>
        )}

        {/* copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-foreground/50">
          <p>
            &copy; {new Date().getFullYear()} E-Commerce Project. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
