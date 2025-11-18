import { useEffect, useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { verifyEmailApi } from '@/services/authServices';

export default function VerifyPage() {
  const [status, setStatus] = useState<'loading'|'ok'|'error'>('loading');
  const [message, setMessage] = useState('Verificando correo...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email') || '';
    const token = params.get('token') || '';
    if (!email || !token) {
      setStatus('error');
      setMessage('Enlace inválido: faltan parámetros.');
      return;
    }
    verifyEmailApi(email, token)
      .then(() => {
        setStatus('ok');
        setMessage('Correo verificado. Ya puedes iniciar sesión.');
      })
      .catch((err) => {
        const m = err?.response?.data?.error || 'No se pudo verificar el correo';
        setStatus('error');
        setMessage(m);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center space-y-4">
          <p className={status === 'error' ? 'text-destructive' : ''}>{message}</p>
          <div className="flex justify-center gap-3">
            <a href="/login" className="underline">Ir a iniciar sesión</a>
          </div>
        </div>
      </main>
    </div>
  );
}
