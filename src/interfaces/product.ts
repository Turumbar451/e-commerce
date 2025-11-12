



// 3. Interfaz para lo que NUESTRO COMPONENTE (ProductCard) espera
export interface IProductForCard {
    id: string; // (Mapeado de _id)
    name: string; // (Mapeado de nombre)
    price: number; // (Mapeado de precio_base)
    brand: string; // (Usaremos un placeholder)
    imageUrl: string; // (Usaremos un placeholder)
}


export interface IProductSize {
    size: string; // "EU 39", "27.5 MX", "M"
    stock: number;
}

export interface IProductVariant {
    colorName: string; // "Blanco/Blanco/Blanco"
    colorHex?: string; // "#FFFFFF"
    sku: string; // SKU principal de esta variante de color
    images: string[]; // imagen especificas de este color
    sizes: IProductSize[]; // stock de cada talla para ESTE color
}

export interface IProductDetail {
    _id: string;
    name: string;
    brand: string;
    price: number;
    salePrice?: number; // precio de oferta
    category: string;

    variants: IProductVariant[];

    description: string;

    details: {
        title: string;
        content: string;
    }[];

    reviews: {
        averageRating: number;
        reviewCount: number;
    };
}