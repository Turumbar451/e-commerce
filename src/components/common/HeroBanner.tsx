//estos son los banners grandotes que puedes ver ahi
export const HeroBanners = () => {
  return (
    <section className="container py-6 md:py-8 mx-auto ">
      {/* 
         grid-cols-1: 1 columna por defecto (telefono)
         md:grid-cols-2: 2 columnas en pantallas de pc
         gap-6: espacio
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* primer banner */}
        <a
          href="/categoria/running"
          className="block overflow-hidden rounded-lg group relative"
        >
          {/* /public/negro.jpg/ por ahora
             'aspect-video'  proporción 16:9,
             h-[400px] altura fija
          */}
          <img
            src="/public/running.jpg" // reemplazae
            alt="Colección Running"
            className="w-full h-full object-cover aspect-3/2 transition-transform duration-300 group-hover:scale-105"
          />
          {/* opcional, es texto sobre la img */}
          <div className="absolute bottom-6 left-6  ">
            <h2 className="text-3xl font-bold text-white [text-shadow:0_2px_4px_rgb(0_0_0/50%)]">
              Colección Running
            </h2>
          </div>
        </a>

        {/* segundo banner  */}
        <a
          href="/categoria/trail"
          className="block overflow-hidden rounded-lg group relative"
        >
          <img
            src="/Trail.png" // reemplazar
            alt="Colección Trail"
            className="w-full h-full object-cover aspect-3/2 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl font-bold text-white [text-shadow:0_2px_4px_rgb(0_0_0/50%)]">
              Equipamiento Trail
            </h2>
          </div>
        </a>
      </div>
    </section>
  );
};
