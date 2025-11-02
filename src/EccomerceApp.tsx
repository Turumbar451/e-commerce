// NO TOQUEN
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/common/ThemeProvider';
import GlobalContext from './context/GlobalContext';
import { queryClient } from './lib/queryCliente';
import { appRouter } from './routes/app.router';
import { RouterProvider } from 'react-router';

const EccomerceApp = () => {
  return (
    <GlobalContext>
      {/*provider de tanstack para cache y fetch */}
      <QueryClientProvider client={queryClient}>
        {/* provider de temas (jeje modo oscuro) */}
        <ThemeProvider defaultTheme="system" storageKey="ecommerce-theme">
          <RouterProvider router={appRouter} />
          {/* sonner */}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalContext>
  );
};

export default EccomerceApp;
