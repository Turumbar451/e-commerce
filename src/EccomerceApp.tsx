// NO TOQUEN
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/common/ThemeProvider';
import { GlobalContextProvider } from './context/GlobalContextProvider';
import { queryClient } from './lib/queryCliente';
import { appRouter } from './routes/app.router';
import { RouterProvider } from 'react-router';
import { Suspense } from 'react';

//mejorar esto a un componente que cargue bonito
const FullPageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div>Cargando...</div>
  </div>
);

const EccomerceApp = () => {
  return (
    <GlobalContextProvider>
      {/*provider de tanstack para cache y fetch */}
      <QueryClientProvider client={queryClient}>
        {/* provider de temas (jeje modo oscuro) */}
        <ThemeProvider defaultTheme="system" storageKey="ecommerce-theme">
          {/* suspense sirve para cargar algo mientras lo original carga, posiblemente lo cambiemos de aqui quien sabe*/}
          <Suspense fallback={<FullPageLoader />}>
            <RouterProvider router={appRouter} />
          </Suspense>
          {/* sonner */}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalContextProvider>
  );
};

export default EccomerceApp;
