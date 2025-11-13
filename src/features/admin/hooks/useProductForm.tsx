import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios'; // Tu instancia de axios
import { createProductV2 } from '@/services/inventoryService';

// servicio para obtener la firma
const getUploadSignature = async () => {
  const { data } = await api.post('/admini/upload-signature');
  return data;
};

// servicio para subir a Cloudinary
const uploadToCloudinary = async (file: File, signatureData: any) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signatureData.api_key);
  formData.append('timestamp', signatureData.timestamp);
  formData.append('signature', signatureData.signature);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`,
    formData
  );

  return data.secure_url; // ¡La URL segura!
};

export const useProductForm = () => {
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  // mutacion para subir archivos
  const uploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      // obtener firma del backend
      const signature = await getUploadSignature();

      // subir cada archivo a cloudinary
      const uploadPromises = Array.from(files).map((file) =>
        uploadToCloudinary(file, signature)
      );

      return Promise.all(uploadPromises);
    },
    onSuccess: (urls) => {
      // guardar urls en el estado
      setUploadedImageUrls((prev) => [...prev, ...urls]);
      console.log('Imágenes subidas:', urls);
    },
    onError: (err) => {
      console.error('Error al subir:', err);
    },
  });

  //? mutacion para guardar el producto final al backend
  const createProductMutation = useMutation({
    mutationFn: createProductV2, // funcion de servicio (promesa que pide datos)
    onSuccess: (data) => {
      // data = { message, product_id }
      console.log('¡Producto creado!', data.product_id);
    },
  });

  return {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        uploadMutation.mutate(e.target.files);
      }
    },
    handleSubmit: (formData: any) => {
      // logica para combinar formData y uploadedImageUrls
      // y llamar a createProductMutation.mutate
    },
    isUploading: uploadMutation.isPending,
    isCreatingProduct: createProductMutation.isPending,
    uploadedImageUrls,
  };
};
