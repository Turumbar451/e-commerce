//en este footer estan las marcas
export const BrandsFooter = () => {
  //  crear /public/logos/ y empezar a añadir
  const brands = [
    { name: 'Adidas', logoUrl: '/logos/adidas.png' },
    { name: 'Puma', logoUrl: '/logos/puma.png' },
    { name: 'Nike', logoUrl: '/logos/nike.png' },
    { name: 'New Balance', logoUrl: '/logos/new-balance.png' },
    { name: 'Reebok', logoUrl: '/logos/reebok.png' },
    { name: 'Pirma', logoUrl: '/logos/pirma.png' },
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
                         transition-all duration-300 hover:opacity-100 hover:filter-none"
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
