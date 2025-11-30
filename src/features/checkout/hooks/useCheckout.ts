import { useState, useMemo } from 'react';
import { useCart } from '@/features/cart/hooks/useCart';

export type CheckoutStep = 'address' | 'shipping' | 'payment' | 'review';
export type ShippingMethod = 'standard' | 'express';

export const useCheckout = () => {
  const [step, setStep] = useState<CheckoutStep>('address');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  
  // Datos de pago simulados (en un caso real, esto lo maneja Stripe/MercadoPago)
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    method: 'Tarjeta' // Por defecto para este flujo
  });

  const { cart } = useCart();

  // Cálculos
  const subtotal = useMemo(() => 
    cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), 
  [cart]);

  const shippingCost = useMemo(() => {
    if (shippingMethod === 'express') return 300;
    return subtotal > 2000 ? 0 : 150;
  }, [shippingMethod, subtotal]);

  const total = subtotal + shippingCost;

  return {
    step, 
    setStep,
    cart,
    selectedAddressId, 
    setSelectedAddressId,
    shippingMethod, 
    setShippingMethod,
    paymentData, 
    setPaymentData,
    totals: {
      subtotal,
      shippingCost,
      total
    }
  };
};