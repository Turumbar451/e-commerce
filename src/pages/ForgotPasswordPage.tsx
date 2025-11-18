import { Navbar } from '@/components/common/Navbar';
import ForgotPassword from '@/features/security/ForgotPassword';

export const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow flex items-center justify-center p-4">
        <ForgotPassword />
      </main>
    </div>
  );
};
