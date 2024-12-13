import { InputHTMLAttributes, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC = ({ className, ...props }: SearchInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <Input
        type='search'
        placeholder='Type to search'
        className={cn(
          'h-9 w-[250px] pl-8 transition-all duration-300 focus-visible:ring-1',
          isExpanded
            ? 'max-sm:w-[160px]'
            : 'max-sm:w-9 max-sm:px-0 max-sm:pl-9',
          'bg-background text-foreground placeholder:text-muted-foreground',
          'border-input hover:bg-accent hover:text-accent-foreground',
          'focus-visible:ring-ring',
        )}
        ref={inputRef}
        {...props}
      />
      <Search
        className={cn(
          'absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer transition-all duration-300',
          'text-muted-foreground',
          isExpanded
            ? 'max-sm:left-2'
            : 'max-sm:left-1/2 max-sm:-translate-x-1/2',
        )}
        onClick={handleSearchClick}
      />
    </div>
  );
};

export default SearchInput;
