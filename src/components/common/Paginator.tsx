// src/components/common/Paginator.tsx
import { Button } from '../ui/button'; // Asegúrate de tener este componente de Shadcn UI

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching: boolean;
}

export function Paginator({ currentPage, totalPages, onPageChange, isFetching }: PaginatorProps) {
  // Generamos el array de páginas
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Calculamos rango para no mostrar mil botones si hay muchas páginas
  const rangeStart = Math.max(1, currentPage - 2);
  const rangeEnd = Math.min(totalPages, currentPage + 2);
  const pagesToShow = pages.slice(rangeStart - 1, rangeEnd);

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isFetching}
        variant="outline"
        size="sm"
      >
        Anterior
      </Button>

      {rangeStart > 1 && <span className="text-gray-500">...</span>}

      {pagesToShow.map(page => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={isFetching}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
        >
          {page}
        </Button>
      ))}

      {rangeEnd < totalPages && <span className="text-gray-500">...</span>}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isFetching}
        variant="outline"
        size="sm"
      >
        Siguiente
      </Button>
    </div>
  );
}