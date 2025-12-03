import { useBrands } from '@/features/admin/hooks/useCatalogs';
import { Link } from 'react-router';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FALLBACK_BRANDS = [
  { name: 'Adidas', slug: 'adidas', logoUrl: '/logos/adidas.svg' },
  { name: 'Puma', slug: 'puma', logoUrl: '/logos/puma.svg' },
  { name: 'Nike', slug: 'nike', logoUrl: '/logos/nike.svg' },
  {
    name: 'New Balance',
    slug: 'new-balance',
    logoUrl: '/logos/new-balance.svg',
  },
  { name: 'Reebok', slug: 'reebok', logoUrl: '/logos/reebok.svg' },
  { name: 'Pirma', slug: 'pirma', logoUrl: '/logos/pirma.svg' },
];

const logoMap = new Map(
  FALLBACK_BRANDS.map((brand) => [brand.slug, brand.logoUrl])
);

const buildLogoUrl = (slug: string) =>
  logoMap.get(slug) ?? `/logos/${slug}.svg`;

export const BrandsFooter = () => {
  const { data, isLoading } = useBrands();

  const brandsToShow = (data && data.length > 0 ? data : FALLBACK_BRANDS).map(
    (brand) => ({
      name: brand.name,
      slug: brand.slug,
      logoUrl:
        'logoUrl' in brand && brand.logoUrl
          ? brand.logoUrl
          : buildLogoUrl(brand.slug),
    })
  );

  return (
    <footer className="w-full bg-background border-t mt-auto">
      <div className="w-full border-b bg-muted/20">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center mb-4">
            Marcas Destacadas
          </p>

          {isLoading ? (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`brand-skeleton-${index}`}
                  className="h-8 w-20 bg-muted/50 rounded animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center grayscale hover:grayscale-0 transition-all duration-500">
              {brandsToShow.map((brand) => (
                <Link
                  key={brand.slug}
                  to={`/?brand=${brand.slug}`}
                  className="group flex justify-center items-center w-full focus:outline-none"
                  aria-label={`Ver productos de ${brand.name}`}
                >
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    loading="lazy"
                    className="h-8 md:h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 dark:invert dark:brightness-0 dark:group-hover:brightness-100"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<span class="text-xs font-semibold text-muted-foreground hover:text-foreground">${brand.name}</span>`;
                    }}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">
              Atención al Cliente
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Rastrear Pedido
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Cambios y Devoluciones
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Métodos de Pago
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 2: Empresa */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Prensa
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Bolsa de Trabajo
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Afiliados
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Av. Reforma 123, Ciudad de México, CDMX</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+52 (55) 1234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contacto@mitienda.com</span>
              </li>
            </ul>
            {/* Redes Sociales */}
            <div className="flex gap-4 pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Columna 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">
              Suscríbete
            </h4>
            <p className="text-sm text-muted-foreground">
              Recibe las últimas noticias, ofertas exclusivas y promociones
              directamente en tu correo.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="tu@correo.com"
                className="bg-background"
              />
              <Button className="w-full">Suscribirse</Button>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Al suscribirte aceptas nuestros términos y condiciones.
            </p>
          </div>
        </div>

        <div className="border-t my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="#" className="hover:text-foreground hover:underline">
              Política de Privacidad
            </Link>
            <Link to="#" className="hover:text-foreground hover:underline">
              Términos y Condiciones
            </Link>
            <Link to="#" className="hover:text-foreground hover:underline">
              Política de Cookies
            </Link>
            <Link to="#" className="hover:text-foreground hover:underline">
              Aviso Legal
            </Link>
          </div>
          <p className="text-center md:text-right">
            &copy; {new Date().getFullYear()} E-Commerce Project. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
