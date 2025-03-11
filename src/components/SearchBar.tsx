
import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar = ({ 
  onSearch, 
  className,
  placeholder = "Search for destinations..."
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative flex items-center w-full max-w-md", 
        className
      )}
    >
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3 pl-12 pr-4 bg-white dark:bg-card border border-border rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm
                     text-foreground placeholder:text-muted-foreground"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
      <button
        type="submit"
        className="absolute right-3 bg-primary text-white p-1.5 rounded-md hover:bg-primary/90 transition-colors"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
};

export default SearchBar;
