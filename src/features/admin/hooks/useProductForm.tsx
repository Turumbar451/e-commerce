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
  colorHex: '',
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

const newDetailTemplate = { title: '', content: '' };

export const useProductForm = () => {
  const [product, setProduct] =
    useState<Partial<IProductDetail>>(initialProductState);
  const [isUploading, setIsUploading] = useState<false | true>(false);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const addDetail = () => {
    setProduct((prev) => ({
      ...prev,
      details: [...(prev.details || []), newDetailTemplate],
    }));
  };

  const removeDetail = (detailIndex: number) => {
    setProduct((prev) => ({
      ...prev,
      details: prev.details?.filter((_, i) => i !== detailIndex),
    }));
  };

  const handleDetailChange = (
    detailIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target; // name será "title" o "content"
    setProduct((prev) => ({
      ...prev,
      details: prev.details?.map((detail, i) =>
        i === detailIndex ? { ...detail, [name]: value } : detail
      ),
    }));
  };

  // campos base
  const handleBaseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'price' || name === 'salePrice') {
      const numericValue = parseFloat(value);
      setProduct((prev) => ({
        ...prev,
        [name]: isNaN(numericValue) ? '' : numericValue,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]:
          name === 'price' || name === 'salePrice' ? parseFloat(value) : value,
      }));
    }
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

    const getFinalValue = () => {
      if (name === 'stock') {
        const numericValue = parseInt(value, 10); // Siempre usa 'radix 10'
        return isNaN(numericValue) ? '' : numericValue; // Si es NaN, guarda '', si no, el número
      }
      return value; // Si es 'size', solo guarda el string
    };

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
                      [name]: getFinalValue(), // Usar la nueva función
                    }
                  : size
              ),
            }
          : variant
      ),
    }));
  };

  //subida d eimagenes
  const handleImageUpload = async (
    variantIndex: number,
    files: FileList | null
  ) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    const toastId = toast.loading('Subiendo imágenes...');
    try {
      const signature = await getCloudinarySignature(); //un permiso que pide al backend
      const uploadPromises = Array.from(files).map(
        (file) => uploadToCloudinary(file, signature) //enviar a cloudinary el archivo y el permiso
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
      toast.success('Imágenes subidas correctamente', { id: toastId });
    } catch (err) {
      toast.error('Error al subir imágenes', { id: toastId });
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
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
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

    createProductMutation.mutate(product); // createProduct(product)
  };

  return {
    //*padre productForm
    isUploading,
    isSaving: createProductMutation.isPending,
    handleSubmit,

    product,
    handleBaseChange,
    addVariant,
    removeVariant,
    handleVariantChange,
    addSize,
    removeSize,
    handleSizeChange,
    handleImageUpload,
    addDetail,
    removeDetail,
    handleDetailChange,
  };
};
