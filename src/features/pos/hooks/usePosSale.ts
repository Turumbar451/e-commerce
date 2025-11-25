import { useMemo, useState } from 'react';
import type { IProductForCard } from '@/interfaces/product';

export interface PosSaleItem {
  productId: string;
  sku: string;
  name: string;
  price: number;
  brand: string;
  size?: string;
  quantity: number;
}

export const usePosSale = () => {
  const [items, setItems] = useState<PosSaleItem[]>([]);

  const addItemFromProduct = (product: IProductForCard) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.productId === product.id
      );
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + 1,
        };
        return copy;
      }
      return [
        ...prev,
        {
          productId: product.id,
          sku: product.sku,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  const addCustomItem = (item: {
    productId: string;
    sku: string;
    name: string;
    brand: string;
    price: number;
    size?: string;
  }) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.productId === item.productId && it.sku === item.sku
      );
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + 1,
        };
        return copy;
      }
      return [
        ...prev,
        {
          productId: item.productId,
          sku: item.sku,
          name: item.name,
          brand: item.brand,
          price: item.price,
          size: item.size,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((it) => it.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((it) =>
        it.productId === productId
          ? {
              ...it,
              quantity,
            }
          : it
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((it) => it.productId !== productId));
  };

  const clearSale = () => {
    setItems([]);
  };

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );

  return {
    items,
    total,
    addItemFromProduct,
    addCustomItem,
    updateQuantity,
    removeItem,
    clearSale,
  };
};
