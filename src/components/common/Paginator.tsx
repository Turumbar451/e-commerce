// src/components/common/Paginator.tsx
import { Button } from '../ui/button'; // Importa el componente Button de Shadcn UI

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching: boolean;
}

/**
 * Componente de paginación con botones Anterior/Siguiente.
 * Muestra solo un rango limitado de páginas para mantener la interfaz limpia.
 */
export function Paginator({ currentPage, totalPages, onPageChange, isFetching }: PaginatorProps) {
  // Crea un array con los números de página (ej. [1, 2, 3, 4, 5])
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Calcula el rango de páginas a mostrar (ej. 5 páginas centradas alrededor de la actual)
  const rangeStart = Math.max(1, currentPage - 2);
  const rangeEnd = Math.min(totalPages, currentPage + 2);
  
  // Filtra el array de páginas para mostrar solo el rango calculado
  const pagesToShow = pages.slice(rangeStart - 1, rangeEnd);


  return (
    <div className="flex items-center space-x-2">
      {/* Botón Anterior */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isFetching}
        variant="outline"
        size="sm"
      >
        Anterior
      </Button>
      
      {/* Si hay páginas omitidas al inicio, muestra puntos suspensivos */}
      {rangeStart > 1 && (
        <span className="text-gray-500 hidden sm:inline-block">...</span>
      )}

      {/* Números de página */}
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

      {/* Si hay páginas omitidas al final, muestra puntos suspensivos */}
      {rangeEnd < totalPages && (
        <span className="text-gray-500 hidden sm:inline-block">...</span>
      )}

      {/* Botón Siguiente */}
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