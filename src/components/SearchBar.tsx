import { Search, X } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
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
    <div className={`relative w-full max-w-md transition-all duration-200 ${focused ? 'max-w-lg' : ''}`}>
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${focused ? 'text-primary' : 'text-muted-foreground'}`} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="What do you want to listen to?"
        className="w-full h-11 pl-11 pr-10 bg-secondary/80 text-foreground text-sm rounded-full border border-border/50 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-secondary placeholder:text-muted-foreground font-body transition-all duration-200"
      />
      {value && (
        <button onClick={clear} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
