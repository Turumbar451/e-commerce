// subcomponente: acordeaon de detalles

import type { IProductDetail } from '@/interfaces/product';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ShieldCheck, Truck } from 'lucide-react';

export const ProductDetailsAccordion = ({
  product,
}: {
  product: IProductDetail;
}) => {
  return (
    <Accordion type="multiple" defaultValue={['description']}>
      <AccordionItem value="description">
        <AccordionTrigger>Descripción</AccordionTrigger>
        <AccordionContent className="prose prose-sm">
          {product.description}
        </AccordionContent>
      </AccordionItem>

      {product.details.map((detail) => (
        <AccordionItem value={detail.title} key={detail.title}>
          <AccordionTrigger>{detail.title}</AccordionTrigger>
          <AccordionContent>{detail.content}</AccordionContent>
        </AccordionItem>
      ))}

      <AccordionItem value="shipping">
        <AccordionTrigger>Envíos y Devoluciones</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <h4 className="font-medium">Envío Estándar</h4>
                <p className="text-sm text-muted-foreground">
                  Recibe en 3-5 días hábiles. Envío gratis en pedidos mayores a
                  $999.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <h4 className="font-medium">Devoluciones Fáciles</h4>
                <p className="text-sm text-muted-foreground">
                  Tienes 30 días para devolver el producto sin costo.
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
