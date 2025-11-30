import { useCart } from '@/features/cart/hooks/useCart';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, isLoadingCart, removeItem, isRemovingItem, updateItem } = useCart();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value);
  };

  // calcular el total
  const totalCart = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
                <div key={`${item.sku}-${item.size}`} className="flex items-center gap-4 border-b pb-4">
                  {/* Imagen del producto */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    {/* CORRECCIÓN AQUÍ: Usar las propiedades en inglés */}
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <p className="text-sm text-muted-foreground">Talla: {item.size}</p>
                    <p className="font-medium text-primary">{formatCurrency(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon-sm"
                      // CORRECCIÓN AQUÍ: item.quantity
                      onClick={() => item.quantity > 1 && updateItem({ sku: item.sku, size: item.size, cantidad: item.quantity - 1 })}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon-sm"
                      // CORRECCIÓN AQUÍ: item.quantity
                      onClick={() => updateItem({ sku: item.sku, size: item.size, cantidad: item.quantity + 1 })}
                    >
                      +
                    </Button>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:bg-destructive/10"
                    // CORRECCIÓN AQUÍ: enviar size también
                    onClick={() => removeItem({ sku: item.sku, size: item.size })}
                    disabled={isRemovingItem}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Columna de Resumen */}
            <div className="md:col-span-1">
              <div className="bg-card border rounded-lg p-6 sticky top-24 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalCart)}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <span>Envío</span>
                  <span>Calculado en el siguiente paso</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(totalCart)}</span>
                </div>
                <Button 
                    className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20" 
                    onClick={() => navigate('/checkout')}
                >
                    Proceder al Pago
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                    Pago seguro garantizado
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;