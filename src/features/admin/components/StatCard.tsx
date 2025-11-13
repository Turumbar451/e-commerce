import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  variant?: 'default' | 'destructive';
}

export const StatCard = ({
  title,
  value,
  icon,
  variant = 'default',
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'text-2xl font-bold',
            variant === 'destructive' && 'text-destructive'
          )}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
};
