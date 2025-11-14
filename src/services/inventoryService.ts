import api from '@/lib/axios';
import type { IProductDetail } from '@/interfaces/product';

// src/services/inventoryService.ts
import axios from 'axios'; // Usamos axios base para Cloudinary

// Interfaz para la respuesta de la firma
interface SignatureResponse {
    timestamp: number;
    signature: string;
    api_key: string;
    cloud_name: string;
}

// Interfaz para la respuesta de creación
interface CreateProductResponse {
    message: string;
    product_id: string;
}

/**
 * 1. Pide una firma segura a nuestro backend
 */
export const getCloudinarySignature = async (): Promise<SignatureResponse> => {
    const { data } = await api.get<SignatureResponse>('/admini/upload-signature');
    return data;
};

/**
 * 2. Sube un archivo directamente a Cloudinary
 */
export const uploadToCloudinary = async (
    file: File,
    signatureData: SignatureResponse
): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', signatureData.api_key);
    formData.append('timestamp', signatureData.timestamp.toString());
    formData.append('signature', signatureData.signature);
    // Opcional: define una carpeta en Cloudinary
    // formData.append('folder', 'ecommerce-products');

    const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`,
        formData
    );

    return data.secure_url; // Devuelve la URL segura
};


//enviar el JSON completo del nuevo producto al backend
export const createProduct = async (
    productData: Partial<IProductDetail> // usamos Partial porque _id, etc. no iran
): Promise<CreateProductResponse> => {
    const { data } = await api.post<CreateProductResponse>(
        '/admini/products-v2',
        productData
    );
    return data;
};

//traer toda la data para el panel de admin de inventario
export const getAdminProducts = async (): Promise<IProductDetail[]> => {
    const { data } = await api.get<IProductDetail[]>('/admini/products');
    return data;
};