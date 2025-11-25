import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createPosRefund, type CreatePosRefundPayload } from '@/services/posService';
import { NavbarCashier } from './NavbarCashier';

export const PosRefundsPage = () => {
  const [invoiceId, setInvoiceId] = useState('');
  const [motivo, setMotivo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!invoiceId.trim()) {
      setError('Debes ingresar un ID de factura (invoice_id).');
      return;
    }

    try {
      setIsSubmitting(true);
      // Por ahora, reembolso total sin desglosar por ítems (backend valida contra la orden)
      const payload: CreatePosRefundPayload = {
        invoice_id: invoiceId.trim(),
        // Por ahora, array vacío: el backend calculará el total en base a la orden si lo permites
        items: [],
        motivo: motivo.trim() || undefined,
      };

      const res = await createPosRefund(payload);
      setMessage(
        `Reembolso registrado correctamente. ID: ${res.refund_id}, total reembolsado: $${res.totalReembolsado.toLocaleString(
          'es-MX'
        )} MXN.`
      );
    } catch (err) {
      console.error('Error registrando reembolso POS', err);
      setError('No se pudo registrar el reembolso. Verifica el invoice_id y vuelve a intentar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavbarCashier />
      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl">Reembolsos POS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            Ingresa el <span className="font-mono">invoice_id</span> de la venta para
            registrar un reembolso. Más adelante se puede extender esta pantalla para
            seleccionar productos específicos.
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-medium" htmlFor="invoice-id">
                ID de factura (invoice_id)
              </label>
              <Input
                id="invoice-id"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                placeholder="Ej. 6529..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium" htmlFor="motivo">
                Motivo del reembolso (opcional)
              </label>
              <Input
                id="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej. Producto defectuoso"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Registrando...' : 'Registrar reembolso'}
            </Button>
          </form>

          {message && (
            <p className="text-xs text-emerald-500 font-medium pt-1">{message}</p>
          )}
          {error && (
            <p className="text-xs text-destructive font-medium pt-1">{error}</p>
          )}
        </CardContent>
      </Card>
      </main>
    </div>
  );
};

export default PosRefundsPage;
