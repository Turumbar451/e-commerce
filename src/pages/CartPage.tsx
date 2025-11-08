// src/pages/CartPage.tsx
import { useCart } from '@/features/cart/hooks/useCart';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner'; //
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  // 1. Usar el hook para OBTENER datos
  const { cart, isLoadingCart, removeItem, isRemovingItem, updateItem } = useCart();

  // Función para formatear (puedes moverla a un 'utils')
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value);
  };
  
  // 2. Manejar el estado de carga
  if (isLoadingCart) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow flex items-center justify-center p-4">
          <Spinner className="h-8 w-8" />
        </main>
      </div>
    );
  }

  // 3. Renderizar el carrito
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
        
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Columna de items */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.sku} className="flex items-center gap-4 border-b pb-4">
                  {/* (Aquí iría la imagen del producto) */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.nombre_producto}</h3>
                    <p className="text-sm text-muted-foreground">Talla: {item.talla}</p>
                    <p className="font-medium">{formatCurrency(item.precio)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Botones para actualizar cantidad */}
                    <Button 
                      variant="outline" 
                      size="icon-sm"
                      onClick={() => item.cantidad > 1 && updateItem({ sku: item.sku, cantidad: item.cantidad - 1 })}
                    >
                      -
                    </Button>
                    <span>{item.cantidad}</span>
                    <Button 
                      variant="outline" 
                      size="icon-sm"
                      onClick={() => updateItem({ sku: item.sku, cantidad: item.cantidad + 1 })}
                    >
                      +
                    </Button>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive"
                    onClick={() => removeItem(item.sku)}
                    disabled={isRemovingItem}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Columna de Resumen */}
            <div className="md:col-span-1">
              <div className="bg-card border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                {/* (Aquí calculas el total) */}
                <Button className="w-full mt-4">Proceder al Pago</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
