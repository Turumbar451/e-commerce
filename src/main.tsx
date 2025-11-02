import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import EccomerceApp from './EccomerceApp.tsx';
import { Toaster } from 'sonner';
//no toquen este archivo
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <EccomerceApp />
  </StrictMode>
);
