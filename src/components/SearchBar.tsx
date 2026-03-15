import { Search, X } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setValue(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (q.trim().length >= 2) onSearch(q.trim());
    }, 400);
  }, [onSearch]);

  const clear = () => {
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-lg w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search songs, artists..."
        className="w-full h-10 pl-10 pr-10 bg-secondary text-foreground text-sm rounded border-none outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground font-body transition-all"
      />
      {value && (
        <button onClick={clear} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
