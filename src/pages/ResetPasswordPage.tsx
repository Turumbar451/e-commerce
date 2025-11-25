import { Navbar } from '@/components/common/Navbar';
import ResetPassword from '@/features/security/ResetPassword';

export const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow flex items-center justify-center p-4">
        <ResetPassword />
      </main>
    </div>
  );
};
