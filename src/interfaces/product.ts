
// 1. Interfaz para la variante (SKU)
export interface IProductVariant {
    sku: string;
    talla: number;
    precio: number;
    stock: number;
}

// 2. Interfaz para lo que VIENE DE LA API
export interface IProductFromApi {
    product_id: string;
    nombre: string;
    precio_base: number;
    skus: IProductVariant[];
    // Nota: El backend aún no envía 'brand' o 'imageUrl'.
}

// 3. Interfaz para lo que NUESTRO COMPONENTE (ProductCard) espera
export interface IProductForCard {
    id: string; // (Mapeado de _id)
    name: string; // (Mapeado de nombre)
    price: number; // (Mapeado de precio_base)
    brand: string; // (Usaremos un placeholder)
    imageUrl: string; // (Usaremos un placeholder)
}