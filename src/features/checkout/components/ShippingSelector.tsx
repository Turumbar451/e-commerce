import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Truck, Zap } from 'lucide-react';
import type { ShippingMethod } from '../hooks/useCheckout';

interface Props {
  selected: ShippingMethod;
  onSelect: (method: ShippingMethod) => void;
  subtotal: number;
}

export const ShippingSelector = ({ selected, onSelect, subtotal }: Props) => {
  const isFreeStandard = subtotal > 2000;

  return (
    <RadioGroup value={selected} onValueChange={(v) => onSelect(v as ShippingMethod)}>
      <div className="grid gap-4 pt-4">
        
        {/* Opción Estándar */}
        <div className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${selected === 'standard' ? 'border-primary bg-primary/5' : ''}`}>
          <RadioGroupItem value="standard" id="shipping-standard" />
          <Label htmlFor="shipping-standard" className="flex flex-1 items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Envío Estándar</p>
                <p className="text-sm text-muted-foreground">3-5 días hábiles</p>
              </div>
            </div>
            <span className="font-bold text-lg">
              {isFreeStandard ? <span className="text-emerald-600">GRATIS</span> : '$150.00'}
            </span>
          </Label>
        </div>

        {/* Opción Express */}
        <div className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${selected === 'express' ? 'border-primary bg-primary/5' : ''}`}>
          <RadioGroupItem value="express" id="shipping-express" />
          <Label htmlFor="shipping-express" className="flex flex-1 items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Envío Express</p>
                <p className="text-sm text-muted-foreground">1-2 días hábiles</p>
              </div>
            </div>
            <span className="font-bold text-lg">$300.00</span>
          </Label>
        </div>

      </div>
    </RadioGroup>
  );
};