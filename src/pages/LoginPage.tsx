import { Navbar } from '@/components/common/Navbar';
import { AuthRedirector } from '@/features/auth/AuthJRedirector';
import { LoginForm } from '@/features/auth/LoginForm';

export const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AuthRedirector />
      <main className="grow flex items-center justify-center p-4">
        {/*  'max-w-md' limita en pc 
           'w-full'para telefonos.
        */}
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};
