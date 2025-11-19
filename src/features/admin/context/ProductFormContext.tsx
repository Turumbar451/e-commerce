import { createContext, useContext, type ReactNode } from 'react';
import { useProductForm } from '../hooks/useProductForm';

// lo que retorne useProductForm sera un tipo que asignamos a ProductFormContextType
type ProductFormContextType = ReturnType<typeof useProductForm>;

const ProductFormContext = createContext<ProductFormContextType | undefined>(
  undefined
);

export const ProductFormProvider = ({ children }: { children: ReactNode }) => {
  const value = useProductForm();
  return <ProductFormContext value={value}>{children}</ProductFormContext>;
};

//hook para consumir contexto para no usar useContext
export const useProductFormContext = () => {
  const context = useContext(ProductFormContext);
  if (context === undefined) {
    throw new Error(
      'useProductFormContext debe ser usado dentro de un ProductFormProvider'
    );
  }
  return context;
};

/* 
  return {
    //! productForm padre
    isSaving: createProductMutation.isPending,
    isUploading,
    handleSubmit,
    
    //?productVariantsCard 
    product,
    addVariant,
    
    //? productDetailCard
    handleBaseChange,
    addDetail,
    removeDetail,
    handleDetailChange,
    product
    
    
    //? productVariantItem
     product,
    isUploading,
    removeVariant,
    handleVariantChange,
    addSize,
    removeSize,
    handleSizeChange,
    handleImageUpload,
  };
*/
