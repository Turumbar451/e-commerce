import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Búsqueda activada:', term); // Debug
    if (term.trim()) {
      console.log('Navegando a:', `/?q=${encodeURIComponent(term)}`); // Debug
      navigate(`/?q=${encodeURIComponent(term)}`);
    } else {
      console.log('Término vacío, navegando a /'); // Debug
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-48 gap-2">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar..."
          className="pl-9 w-full bg-background text-sm"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
    </form>
  );
};