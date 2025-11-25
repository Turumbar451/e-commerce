import { useState } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import type { IProductForCard } from '@/interfaces/product';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NavbarCashier } from './NavbarCashier';
import { useLocation } from 'react-router';
import { usePosSale } from '@/features/pos/hooks/usePosSale';
import { checkoutPosSale, type CheckoutPosResponse } from '@/services/orderService';
import { PosAddToSaleDialog } from './PosAddToSaleDialog';
import { useQueryClient } from '@tanstack/react-query';

type CashierView = 'search' | 'sale' | 'close';

const PosPage = () => {
  const [search, setSearch] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Tarjeta'>('Efectivo');
  const [checkoutResult, setCheckoutResult] = useState<CheckoutPosResponse | null>(null);
  const [isProcessingSale, setIsProcessingSale] = useState(false);
  const [saleError, setSaleError] = useState<string | null>(null);

  const { products, isLoading, isError } = useProducts();

  const queryClient = useQueryClient();

  const location = useLocation();
  const path = location.pathname;
  let activeView: CashierView = 'sale';
  if (path.endsWith('/search')) activeView = 'search';
  else if (path.endsWith('/close')) activeView = 'close';

  const { items, total, addCustomItem, updateQuantity, removeItem, clearSale } = usePosSale();

  const filteredProducts: IProductForCard[] | undefined = products?.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  });

  const PAGE_SIZE = 10;
  const totalSearchPages = filteredProducts
    ? Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
    : 1;

  const currentPage = Math.min(searchPage, totalSearchPages);

  const paginatedProducts = filteredProducts
    ? filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    : [];

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

              {!isLoading && !isError && paginatedProducts && paginatedProducts.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedProducts.map((product) => (
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
                      <PosAddToSaleDialog
                        product={product}
                        onAdd={(item) => addCustomItem(item)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && !isError && filteredProducts && filteredProducts.length > PAGE_SIZE && (
                <div className="flex items-center justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setSearchPage((p) => Math.max(1, p - 1))}
                  >
                    Anterior
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Página {currentPage} de {totalSearchPages}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalSearchPages}
                    onClick={() =>
                      setSearchPage((p) =>
                        filteredProducts ? Math.min(totalSearchPages, p + 1) : p
                      )}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Vista: Venta de productos */}
          {activeView === 'sale' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Aquí podrás gestionar el carrito y registrar el pago del cliente.
              </p>

              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay productos en la venta actual. Ve a la pestaña de búsqueda para agregar productos.
                </p>
              ) : (
                <>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between gap-3 border-b pb-3"
                      >
                        <div className="flex-1">
                          <p className="font-semibold leading-tight">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.brand}</p>
                          <p className="text-sm font-medium">
                            ${item.price.toLocaleString('es-MX')} MXN
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantity(item.productId, item.quantity - 1)
                                : removeItem(item.productId)
                            }
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId)}
                        >
                          Quitar
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 border-t">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total a cobrar (según carrito actual)</p>
                      <p className="text-2xl font-bold">
                        ${total.toLocaleString('es-MX')} MXN
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total + IVA (16%): ${(total * 1.16).toLocaleString('es-MX')} MXN
                      </p>

                      {checkoutResult && (
                        <p className="mt-2 text-sm text-emerald-500 font-medium">
                          Compra registrada correctamente. Folio:{' '}
                          <span className="font-mono">
                            {checkoutResult.ticket_id || checkoutResult.invoice_id}
                          </span>
                        </p>
                      )}

                      {saleError && (
                        <p className="text-sm text-destructive mt-1">{saleError}</p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex items-center gap-2 sm:mr-4">
                        <span className="text-sm">Método de pago:</span>
                        <select
                          className="border rounded-md bg-background px-2 py-1 text-sm"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value as 'Efectivo' | 'Tarjeta')}
                        >
                          <option value="Efectivo">Efectivo</option>
                          <option value="Tarjeta">Tarjeta</option>
                        </select>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => clearSale()}
                      >
                        Limpiar venta
                      </Button>
                      <Button
                        type="button"
                        disabled={isProcessingSale}
                        onClick={async () => {
                          if (items.length === 0) {
                            setSaleError('No hay productos en la venta actual.');
                            return;
                          }

                          try {
                            setIsProcessingSale(true);
                            setSaleError(null);

                            const payload = {
                              items: items.map((it) => ({
                                sku: it.sku,
                                cantidad: it.quantity,
                                size: it.size ?? '',
                              })),
                              metodo_pago: paymentMethod,
                              origen_venta: 'VENTA_POS',
                            } as const;

                            const result = await checkoutPosSale(payload);
                            setCheckoutResult(result);

                            // Invalidar cache de productos para refrescar stock en POS
                            queryClient.invalidateQueries({ queryKey: ['products'] });
                          } catch (error) {
                            setSaleError('No se pudo registrar la venta. Intenta de nuevo.');
                            console.error('Error registrando venta POS', error);
                          } finally {
                            setIsProcessingSale(false);
                          }
                        }}
                      >
                        {isProcessingSale ? 'Registrando...' : 'Registrar venta'}
                      </Button>
                    </div>
                  </div>
                </>
              )}
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
