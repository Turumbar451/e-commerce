import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

interface Props {
  paymentData: any;
  onChange: (data: any) => void;
}

export const PaymentForm = ({ paymentData, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...paymentData, [name]: value });
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Tarjeta de Crédito / Débito</h3>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cardName">Nombre en la tarjeta</Label>
        <Input 
          id="cardName" 
          name="cardName" 
          placeholder="Como aparece en el plástico" 
          value={paymentData.cardName}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Número de tarjeta</Label>
        <Input 
          id="cardNumber" 
          name="cardNumber" 
          placeholder="0000 0000 0000 0000" 
          maxLength={19}
          value={paymentData.cardNumber}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiración (MM/AA)</Label>
          <Input 
            id="expiry" 
            name="expiry" 
            placeholder="MM/AA" 
            maxLength={5}
            value={paymentData.expiry}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input 
            id="cvv" 
            name="cvv" 
            placeholder="123" 
            maxLength={4} 
            type="password"
            value={paymentData.cvv}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};