import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ImageUp, PlusCircle, Trash2 } from 'lucide-react';
import { useProductForm } from '../hooks/useProductForm';
import { Spinner } from '@/components/ui/spinner'; //

export const ProductForm = () => {
  const {
    product,
    isUploading,
    isSaving,
    handleBaseChange,
    addVariant,
    removeVariant,
    handleVariantChange,
    addSize,
    removeSize,
    handleSizeChange,
    handleImageUpload,
    handleSubmit,
  } = useProductForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* columna izquierda */}
      <div className="lg:col-span-2 space-y-6">
        {/* detalles del producto */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input
                id="name"
                name="name"
                value={product.name}
                onChange={handleBaseChange}
                placeholder="Ej: Botas de Montaña Impermeables"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleBaseChange}
                placeholder="Conquista cualquier sendero..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={product.brand}
                  onChange={handleBaseChange}
                  placeholder="Ej: AventuraPro"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleBaseChange}
                  placeholder="Ej: Calzado"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* variantes, tallas y stock */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Variantes, Tallas y Stock</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addVariant}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Agregar Variante
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {product.variants?.map((variant, vIndex) => (
              <div key={vIndex} className="border rounded-md p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Variante {vIndex + 1}</Label>
                  {product.variants?.length ||
                    (0 > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeVariant(vIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    name="colorName"
                    value={variant.colorName}
                    onChange={(e) => handleVariantChange(vIndex, e)}
                    placeholder="Nombre (Ej: Marrón Coyote)"
                    required
                  />
                  <Input
                    name="sku"
                    value={variant.sku}
                    onChange={(e) => handleVariantChange(vIndex, e)}
                    placeholder="SKU (Ej: AP-BOTA-COY-01)"
                    required
                  />
                  <Input
                    name="colorHex"
                    value={variant.colorHex}
                    onChange={(e) => handleVariantChange(vIndex, e)}
                    placeholder="Hex (Ej: #8D6E63)"
                  />
                </div>

                {/* subida de imagenes para la variante */}
                <Label>Imágenes de esta variante</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <ImageUp className="h-8 w-8 text-muted-foreground" />
                  <Input
                    type="file"
                    multiple
                    className="mt-2"
                    onChange={(e) => handleImageUpload(vIndex, e.target.files)}
                    disabled={isUploading}
                  />
                </div>
                {/* preview de las imagenes subidas */}
                <div className="flex gap-2 flex-wrap">
                  {variant.images.map((imgUrl, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={imgUrl}
                      alt={`preview ${imgIndex}`}
                      className="h-20 w-20 object-cover rounded-md border"
                    />
                  ))}
                  {isUploading && <Spinner />}
                </div>

                <Separator />
                <Label>Tallas y Stock</Label>
                {variant.sizes.map((size, sIndex) => (
                  <div key={sIndex} className="flex items-center gap-2">
                    <Input
                      name="size"
                      value={size.size}
                      onChange={(e) => handleSizeChange(vIndex, sIndex, e)}
                      placeholder="Talla (Ej: 27 MX)"
                      className="w-1/2"
                      required
                    />
                    <Input
                      name="stock"
                      type="number"
                      value={size.stock}
                      onChange={(e) => handleSizeChange(vIndex, sIndex, e)}
                      placeholder="Stock"
                      className="w-1/2"
                      required
                    />
                    {variant.sizes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeSize(vIndex, sIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => addSize(vIndex)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Agregar Talla
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* columnda derecha */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Precio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio Base (MXN)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleBaseChange}
                placeholder="2899.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Precio de Oferta (Opcional)</Label>
              <Input
                id="salePrice"
                name="salePrice"
                type="number"
                value={product.salePrice || ''}
                onChange={handleBaseChange}
                placeholder="2499.00"
              />
            </div>
          </CardContent>
        </Card>

        {/* aqui podemos añadir tarjetas de estado, o destacado */}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isUploading || isSaving}
        >
          {isSaving ? <Spinner className="mr-2" /> : null}
          {isSaving ? 'Guardando...' : 'Guardar Producto'}
        </Button>
      </div>
    </form>
  );
};
