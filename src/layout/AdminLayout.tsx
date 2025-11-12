import { Navbar } from '@/components/common/Navbar';
import { Outlet } from 'react-router';

export const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
