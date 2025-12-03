//en este footer estan las marcas
export const BrandsFooter = () => {
  //  crear /public/logos/ y empezar a añadir
  const brands = [
    { name: 'Adidas', logoUrl: '/logos/adidas.svg' },
    { name: 'Puma', logoUrl: '/logos/puma.svg' },
    { name: 'Nike', logoUrl: '/logos/nike.svg' },
    { name: 'New Balance', logoUrl: '/logos/new-balance.svg' },
    { name: 'Reebok', logoUrl: '/logos/reebok.svg' },
    { name: 'Pirma', logoUrl: '/logos/pirma.svg' },
  ];

  return (
    <footer className=" mx-auto border-t bg-background mt-12">
      <div className="container py-12">
        {/* Seccion de Logos */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {brands.map((brand) => (
            <img
              key={brand.name}
              src={brand.logoUrl}
              alt={`Logo de ${brand.name}`}
              className="h-8 md:h-10 w-auto mx-auto filter grayscale opacity-60
                         transition-all duration-300 hover:opacity-100 hover:filter-none
                         dark:invert dark:brightness-0 dark:contrast-200"
            />
          ))}
        </div>

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
