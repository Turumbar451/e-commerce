import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyPosSales, type GetMySalesResponse, type PosSaleSummary } from '@/services/posService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NavbarCashier } from './NavbarCashier';

export const PosSalesHistoryPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<GetMySalesResponse, Error>({
    queryKey: ['pos-my-sales', page],
    queryFn: () => getMyPosSales(page, 10),
  });

  const items: PosSaleSummary[] = data?.items ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavbarCashier />
      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-xl">Historial de ventas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {isLoading && <p className="text-muted-foreground">Cargando ventas...</p>}
          {isError && (
            <p className="text-destructive">Error al cargar el historial de ventas.</p>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <p className="text-muted-foreground">
              No se encontraron ventas registradas para este cajero.
            </p>
          )}

          {!isLoading && !isError && items.length > 0 && (
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 font-medium border-b pb-1">
                <span>Fecha</span>
                <span>Método</span>
                <span className="text-right">Subtotal</span>
                <span className="text-right">Total</span>
              </div>
              {items.map((sale: PosSaleSummary) => (
                <div
                  key={sale.order_id}
                  className="grid grid-cols-4 gap-2 border-b py-1 text-xs sm:text-sm"
                >
                  <span>{new Date(sale.fecha).toLocaleString('es-MX')}</span>
                  <span>{sale.metodo_pago}</span>
                  <span className="text-right">
                    ${sale.subtotal.toLocaleString('es-MX')} MXN
                  </span>
                  <span className="text-right">
                    ${sale.total.toLocaleString('es-MX')} MXN
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between pt-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Anterior
                </Button>
                <p className="text-xs text-muted-foreground">
                  Página {data?.page ?? page} de {data?.totalPages ?? 1}
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={!data || data.page >= data.totalPages}
                  onClick={() =>
                    setPage((p) => (data ? Math.min(data.totalPages, p + 1) : p))
                  }
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      </main>
    </div>
  );
};

export default PosSalesHistoryPage;
