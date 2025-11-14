import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import type {
  IProductDetail,
  IProductVariant,
  IProductSize,
} from '@/interfaces/product';
import {
  getCloudinarySignature,
  uploadToCloudinary,
  createProduct,
} from '@/services/inventoryService';

// estructura de una variante
const newSizeTemplate: IProductSize = { size: '', stock: 0 };
const newVariantTemplate: IProductVariant = {
  colorName: '',
  sku: '',
  images: [],
  sizes: [newSizeTemplate],
};

// estado del formulario
const initialProductState: Partial<IProductDetail> = {
  name: '',
  brand: '',
  category: '',
  description: '',
  price: 0,
  salePrice: undefined,
  details: [{ title: 'Material', content: '' }],
  variants: [newVariantTemplate],
};

export const useProductForm = () => {
  const [product, setProduct] =
    useState<Partial<IProductDetail>>(initialProductState);
  const [isUploading, setIsUploading] = useState<false | true>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // campos base
  const handleBaseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'salePrice' ? parseFloat(value) : value,
    }));
  };

  //variantes
  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), newVariantTemplate],
    }));
  };

  const removeVariant = (variantIndex: number) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants?.filter((_, i) => i !== variantIndex),
    }));
  };

  const handleVariantChange = (
    variantIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target; //  name="colorName", value="Rojo"
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants?.map((variant, i) =>
        i === variantIndex ? { ...variant, [name]: value } : variant
      ),
    }));
  };

  // tallas dentro de variantes
  const addSize = (variantIndex: number) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants?.map((variant, i) =>
        i === variantIndex
          ? { ...variant, sizes: [...variant.sizes, newSizeTemplate] }
          : variant
      ),
    }));
  };

  const removeSize = (variantIndex: number, sizeIndex: number) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants?.map((variant, i) =>
        i === variantIndex
          ? {
              ...variant,
              sizes: variant.sizes.filter((_, j) => j !== sizeIndex),
            }
          : variant
      ),
    }));
  };

  const handleSizeChange = (
    variantIndex: number,
    sizeIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target; // name="size", value="28 MX"
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants?.map((variant, i) =>
        i === variantIndex
          ? {
              ...variant,
              sizes: variant.sizes.map((size, j) =>
                j === sizeIndex
                  ? {
                      ...size,
                      [name]: name === 'stock' ? parseInt(value) : value,
                    }
                  : size
              ),
            }
          : variant
      ),
    }));
  };

  // subida de imagenes
  const handleImageUpload = async (
    variantIndex: number,
    files: FileList | null
  ) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    toast.loading('Subiendo imágenes...');

    try {
      const signature = await getCloudinarySignature();
      const uploadPromises = Array.from(files).map((file) =>
        uploadToCloudinary(file, signature)
      );
      const urls = await Promise.all(uploadPromises);

      // añadir urls a la variante correcta
      setProduct((prev) => ({
        ...prev,
        variants: prev.variants?.map((variant, i) =>
          i === variantIndex
            ? { ...variant, images: [...variant.images, ...urls] }
            : variant
        ),
      }));
      toast.success('Imágenes subidas correctamente');
    } catch (err) {
      toast.error('Error al subir imágenes');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // envio del formulario
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['products'] }); // para que tanstack haga fetch la proxima vez
      navigate('/admin/products'); // regresar a la tabla
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Error al crear el producto');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //validaciones-
    if (!product.name) {
      toast.error('El nombre del producto es obligatorio');
      return;
    }
    if (!product.variants || product.variants.length === 0) {
      toast.error('Debe haber al menos una variante');
      return;
    }
    //! posiblemente añadir mas validaciones

    createProductMutation.mutate(product);
  };

  return {
    product,
    isUploading,
    isSaving: createProductMutation.isPending,

    handleBaseChange,
    addVariant,
    removeVariant,
    handleVariantChange,
    addSize,
    removeSize,
    handleSizeChange,
    handleImageUpload,
    handleSubmit,
  };
};
