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

//pra la respuesta del kpi /api/admini/stats
export interface InventoryStats {
    totalItems: number;
    onSaleCount: number;
    lowStockCount: number;
    noStockCount: number;
}

// Interfaz para la respuesta de creación
interface CreateProductResponse {
    message: string;
    product_id: string;
}
export interface PaginatedAdminProducts {
    data: IProductDetail[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalProducts: number;
        limit: number;
    };
}
/**
 * 1. Pide una firma segura a nuestro backend
 */
export const getCloudinarySignature = async (): Promise<SignatureResponse> => {
    const { data } = await api.get<SignatureResponse>('/admini/upload-signature');
    return data;
};


export const uploadToCloudinary = async (
    file: File,
    signatureData: SignatureResponse
): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', signatureData.api_key);
    formData.append('timestamp', signatureData.timestamp.toString());
    formData.append('signature', signatureData.signature);
    // formData.append('folder', 'ecommerce-products');

    const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`,
        formData
    );

    return data.secure_url; // devuelve url
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
export const getAdminProducts = async (
    page = 1,
    limit = 20
): Promise<PaginatedAdminProducts> => {
    const { data } = await api.get<PaginatedAdminProducts>('/admini/products', {
        params: { page, limit } //* ?page=1&limit=20
    });
    return data;
};

//llama al endpoint del api que hace los calculos
export const getInventoryStats = async (): Promise<InventoryStats> => {
    const { data } = await api.get<InventoryStats>('/admini/stats');
    return data;
};


