import { useCheckout } from '@/features/checkout/hooks/useCheckout';
import { AddressSelector } from '@/features/checkout/components/AddressSelector';
import { ShippingSelector } from '@/features/checkout/components/ShippingSelector';
import { PaymentForm } from '@/features/checkout/components/PaymentForm';
import { OrderSummary } from '@/features/checkout/components/OrderSummary';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';

const CheckoutPage = () => {
  const {
    step,
    setStep,
    cart,
    selectedAddressId,
    setSelectedAddressId,
    shippingMethod,
    setShippingMethod,
    paymentData,
    setPaymentData,
    totals
  } = useCheckout();

  // Pasos secuenciales
  const canAdvanceToShipping = !!selectedAddressId;
  const canAdvanceToPayment = canAdvanceToShipping && !!shippingMethod;
  const canConfirm = canAdvanceToPayment && paymentData.cardNumber.length > 10;

  if (cart.length === 0) {
    return <div className="p-10 text-center">Tu carrito está vacío</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
      <div className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Pasos */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PASO 1: DIRECCIÓN */}
          <div className="bg-black p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Dirección de Envío
              </h2>
              {step !== 'address' && selectedAddressId && (
                <Button variant="ghost" size="sm" onClick={() => setStep('address')}>Editar</Button>
              )}
            </div>
            
            {(step === 'address') && (
              <div className="animate-in fade-in slide-in-from-top-4">
                <AddressSelector 
                  selectedAddressId={selectedAddressId} 
                  onSelect={setSelectedAddressId} 
                />
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={() => setStep('shipping')} 
                    disabled={!canAdvanceToShipping}
                  >
                    Continuar a Envíos <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Resumen minimizado si no es el paso activo */}
            {step !== 'address' && selectedAddressId && (
                <div className="pl-10 text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500 h-4 w-4" /> Dirección seleccionada
                </div>
            )}
          </div>

          {/* PASO 2: ENVÍO */}
          <div className={`bg-white p-6 rounded-xl border shadow-sm ${!canAdvanceToShipping ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Método de Envío
              </h2>
              {step !== 'shipping' && step !== 'address' && (
                <Button variant="ghost" size="sm" onClick={() => setStep('shipping')}>Editar</Button>
              )}
            </div>

            {step === 'shipping' && (
              <div className="animate-in fade-in slide-in-from-top-4">
                <ShippingSelector 
                  selected={shippingMethod} 
                  onSelect={setShippingMethod} 
                  subtotal={totals.subtotal}
                />
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={() => setStep('payment')} 
                  >
                    Continuar al Pago <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
             {/* Resumen minimizado */}
             {step === 'payment' && (
                <div className="pl-10 text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500 h-4 w-4" /> {shippingMethod === 'standard' ? 'Envío Estándar' : 'Envío Express'}
                </div>
            )}
          </div>

          {/* PASO 3: PAGO */}
          <div className={`bg-white p-6 rounded-xl border shadow-sm ${step !== 'payment' ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Método de Pago
            </h2>

            {step === 'payment' && (
              <div className="animate-in fade-in slide-in-from-top-4">
                <PaymentForm 
                  paymentData={paymentData} 
                  onChange={setPaymentData} 
                />
              </div>
            )}
          </div>

        </div>

        {/* Columna Derecha: Resumen */}
        <div className="lg:col-span-1">
          <OrderSummary 
            items={cart} 
            totals={totals} 
            canConfirm={canConfirm}
            checkoutData={{
                addressId: selectedAddressId,
                shippingMethod
            }} 
          />
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;