import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { formatCurrency } from '@/lib/formatters';
import type { ICartItem } from '@/services/cartServices';
import api from '@/lib/axios'; // Llamada directa o crear servicio orderServices.ts
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  items: ICartItem[];
  totals: { subtotal: number; shippingCost: number; total: number };
  canConfirm: boolean;
  checkoutData: any; // Datos reunidos (addressId, shippingMethod, payment)
}

export const OrderSummary = ({
  items,
  totals,
  canConfirm,
  checkoutData,
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Instancia del queryClient

  const handleConfirmOrder = async () => {
    if (!canConfirm) return;
    setIsProcessing(true);

    try {
      // Construir payload para el backend
      const payload = {
        items: items.map((i) => ({
          sku: i.sku,
          size: i.size,
          cantidad: i.quantity,
        })),
        metodo_pago: 'Tarjeta', // Hardcodeado por ahora o dinámico
        address_id: checkoutData.addressId,
        shipping_method: checkoutData.shippingMethod,
      };

      const { data } = await api.post('/orders/checkout', payload);

      if (data.success) {
        toast.success('¡Pedido realizado con éxito!');
        // limpiar carrito visualmente invalidando la query
        await queryClient.invalidateQueries({ queryKey: ['cart'] });
        // redirigir a la nueva página usando el ID que devuelve el backend
        navigate(`/order-confirmation/${data.order_id}`);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Error al procesar el pedido');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Lista reducida de items */}
        <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
          {items.map((item) => (
            <div
              key={`${item.sku}-${item.size}`}
              className="flex justify-between text-sm"
            >
              <div className="flex gap-3">
                <span className="font-medium text-muted-foreground">
                  {item.quantity}x
                </span>
                <div>
                  <p className="font-medium line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.size}</p>
                </div>
              </div>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Envío</span>
            <span
              className={
                totals.shippingCost === 0 ? 'text-emerald-600 font-medium' : ''
              }
            >
              {totals.shippingCost === 0
                ? 'Gratis'
                : formatCurrency(totals.shippingCost)}
            </span>
          </div>
          <div className="flex justify-between pt-2 font-bold text-lg">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleConfirmOrder}
          disabled={!canConfirm || isProcessing}
        >
          {isProcessing ? <Spinner className="mr-2" /> : null}
          {isProcessing ? 'Procesando...' : 'Confirmar y Pagar'}
        </Button>
      </CardFooter>
    </Card>
  );
};
