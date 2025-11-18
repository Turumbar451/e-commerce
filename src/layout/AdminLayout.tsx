import { AdminSidebar } from '@/features/admin/components/AdminSidebar';
import { Outlet } from 'react-router';
import { AdminHeader } from '@/features/admin/components/AdminHeader';

export const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        <AdminHeader />

        {/*contendiodo de la pagina */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
