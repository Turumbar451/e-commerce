import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      // Esto cambia la URL a: /?q=termino (o /catalogo?q=termino si usas otra ruta)
      navigate(`/?q=${encodeURIComponent(term)}`);
    } else {
      navigate('/'); // Si borran el texto, volvemos al inicio limpio
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-sm gap-2">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar..."
          className="pl-9 w-full bg-background"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
    </form>
  );
};