import { Navbar } from '@/components/common/Navbar';
import { RegisterForm } from '@/features/auth/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </main>
    </div>
  );
};
