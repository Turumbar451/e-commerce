import { useMemo } from 'react';
import { useAdminProducts } from './useAdminProducts';
import type {
    IProductDetail,
    IProductVariant,
    IProductSize,
} from '@/interfaces/product';
import type { InventoryItem } from '../components/ProductDataTable';


export const useAdminInventory = () => {

    const {
        products,
        pagination,
        isLoading: isLoadingTable,
        isError: isErrorTable,
        page,
        setPage,
    } = useAdminProducts();

    const inventoryItems: InventoryItem[] = useMemo(() => {
        return products.flatMap((product: IProductDetail) =>
            product.variants.flatMap((variant: IProductVariant) =>
                variant.sizes.map((size: IProductSize) => ({
                    id: `${product._id}-${variant.sku}-${size.size}`,
                    name: product.name,
                    variantName: variant.colorName,
                    sku: variant.sku,
                    size: size.size,
                    stock: size.stock,
                    price: product.salePrice || product.price,
                    imageUrl: variant.images[0] || '/placeholder-shoe.jpg',
                    status:
                        size.stock === 0
                            ? 'Agotado'
                            : size.stock < 10
                                ? 'Bajo'
                                : 'Óptimo',
                }))
            )
        );
    }, [products]);

    const handlePrevPage = () => {
        setPage((prev: number) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        if (pagination && page < pagination.totalPages) {
            setPage((prev: number) => prev + 1);
        }
    };

    return {

        inventoryItems,
        pagination,
        page,
        setPage,
        isLoadingTable,
        isErrorTable,
        handlePrevPage,
        handleNextPage,
    };
};