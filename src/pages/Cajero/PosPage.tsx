import { useState } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import type { IProductForCard } from '@/interfaces/product';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NavbarCashier } from './NavbarCashier';
import { useLocation } from 'react-router';

type CashierView = 'search' | 'sale' | 'close';

const PosPage = () => {
  const [search, setSearch] = useState('');

  const { products, isLoading, isError } = useProducts();

   const location = useLocation();
   const path = location.pathname;
   let activeView: CashierView = 'sale';
   if (path.endsWith('/search')) activeView = 'search';
   else if (path.endsWith('/close')) activeView = 'close';

  const filteredProducts: IProductForCard[] | undefined = products?.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavbarCashier />
      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl">Panel de cajero</CardTitle>
          <CardDescription>
            Gestiona la búsqueda de productos, registra ventas y realiza el cierre de caja.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Vista: Búsqueda de productos */}
          {activeView === 'search' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Busca productos por nombre o marca para agregarlos a una venta.
                </p>
                <Input
                  placeholder="Buscar por nombre o marca..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {isLoading && (
                <p className="text-sm text-muted-foreground">Cargando productos...</p>
              )}

              {isError && (
                <p className="text-sm text-destructive">Error al cargar los productos.</p>
              )}

              {!isLoading && !isError && filteredProducts && filteredProducts.length === 0 && (
                <p className="text-sm text-muted-foreground">No se encontraron productos para ese criterio.</p>
              )}

              {!isLoading && !isError && filteredProducts && filteredProducts.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-lg border bg-card text-card-foreground p-3 flex flex-col gap-2"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-md bg-muted flex items-center justify-center">
                        {/* Imagen sencilla del producto */}
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold leading-tight">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                        <p className="font-bold text-primary">
                          ${product.price.toLocaleString('es-MX')} MXN
                        </p>
                      </div>
                      <Button type="button" className="mt-auto w-full" variant="secondary">
                        Agregar a venta (pendiente)
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Vista: Venta de productos (placeholder) */}
          {activeView === 'sale' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Aquí podrás gestionar el carrito y registrar el pago del cliente.
              </p>
              <Button
                type="button"
                className="w-full md:w-auto"
                onClick={() => {
                  // Placeholder: aquí iría la lógica real de iniciar una venta
                  console.log('Iniciar flujo de venta (pendiente de implementación)');
                }}
              >
                Iniciar venta (pendiente)
              </Button>
            </div>
          )}

          {/* Vista: Cierre de caja */}
            {activeView === 'close' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Registra el cierre de caja al final del turno. Por ahora es solo un formulario de ejemplo.
                </p>
                <form
                  className="space-y-4 max-w-md"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Placeholder: aquí podrías enviar los datos al backend
                    console.log('Cierre de caja enviado (pendiente de implementación)');
                  }}
                >
                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="initial-cash">
                      Efectivo inicial de caja
                    </label>
                    <Input
                      id="initial-cash"
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="Ej. 1000"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="final-cash">
                      Efectivo final en caja
                    </label>
                    <Input
                      id="final-cash"
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="Ej. 3250"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="notes">
                      Notas del turno
                    </label>
                    <textarea
                      id="notes"
                      className="w-full min-h-[80px] rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Diferencias, incidencias, etc."
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Registrar cierre de caja (demo)
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PosPage;
