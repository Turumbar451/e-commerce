//galeria de imagenes
import { useState } from 'react';

export const ProductImageGallery = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* imagen principal*/}
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={mainImage}
          alt="Producto"
          className="h-full w-full object-cover transition-opacity duration-300"
        />
      </div>
      {/* thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`aspect-square w-full overflow-hidden rounded-md bg-gray-100 ring-offset-2 transition-all ${
              mainImage === img
                ? 'ring-2 ring-primary'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
