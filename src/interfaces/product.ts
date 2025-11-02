
export interface IProductColor {
    name: string;
    hexCode: string;
}

/**
 * Interfaz principal para un Producto en el e-commerce.
 */
export interface IProduct {
    id: string;         // Mapeado del _id de MongoDB
    name: string;       //  Bota Britton Road de piel para hombre
    brand: string;      //  Timberland
    price: number;
    stock: number;
    // Para la página de detalles
    description?: string;
    category?: string;   //"Hombres", "Botas"

    // Para las tarjetas y galería
    imageUrl: string;   // La imagen principal que se ve en la tarjeta
    images?: string[];  // Galería de imágenes para la página de detalle

    // Variantes (basado en el ejemplo)
    sizes?: string[];   //  ["7", "7.5", "8", "8.5"]
    colors?: IProductColor[];

    // Reseñas 
    rating?: number;    // Calificación promedio (ej: 4.5)
    numReviews?: number; // Número de reseñas (ej: 41)
}