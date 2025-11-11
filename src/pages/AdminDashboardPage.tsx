import { Navbar } from '@/components/common/Navbar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Panel de Administración</CardTitle>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};
