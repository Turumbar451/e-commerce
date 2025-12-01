import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, Package, MapPin, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { getOrderById } from '@/services/orderService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/common/Navbar';

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="grow flex items-center justify-center">
          <Spinner className="h-10 w-10 text-primary" />
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="grow flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold text-destructive">No se encontró el pedido</h2>
          <Button asChild><Link to="/">Volver al inicio</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-background">
      <Navbar />
      
      <main className="grow container mx-auto p-4 md:py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Header de Éxito */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">¡Gracias por tu compra!</h1>
            <p className="text-muted-foreground">
              Tu pedido <span className="font-mono font-medium text-foreground">#{order.order_id.slice(-6).toUpperCase()}</span> ha sido confirmado.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Columna Izquierda: Detalles */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" /> Productos
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="h-16 w-16 rounded-md border bg-muted overflow-hidden shrink-0">
                        <img 
                          src={item.imagen || '/placeholder-shoe.jpg'} 
                          alt={item.nombre} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.nombre}</p>
                        <p className="text-xs text-muted-foreground">Talla: {item.size} | Cant: {item.cantidad}</p>
                      </div>
                      <p className="font-medium text-sm">
                        {formatCurrency(item.precio_unitario * item.cantidad)}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> Dirección de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  <p className="font-medium text-foreground">
                    {order.direccion_envio.calle} #{order.direccion_envio.numero}
                  </p>
                  <p>{order.direccion_envio.colonia}</p>
                  <p>{order.direccion_envio.ciudad}, {order.direccion_envio.estado}</p>
                  <p>C.P. {order.direccion_envio.cp}</p>
                </CardContent>
              </Card>
            </div>

            {/* Columna Derecha: Totales */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA (16%)</span>
                    <span>{formatCurrency(order.iva)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>{order.costo_envio === 0 ? 'Gratis' : formatCurrency(order.costo_envio)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      <span>Estatus:</span>
                      <Badge variant={order.estatus === 'pagado' ? 'default' : 'secondary'}>
                        {order.estatus.toUpperCase()}
                      </Badge>
                    </div>
                    <Button asChild className="w-full" size="lg">
                      <Link to="/">
                        Seguir comprando <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmationPage;