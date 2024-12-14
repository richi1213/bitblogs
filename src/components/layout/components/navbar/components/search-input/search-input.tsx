import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import qs from 'qs';
import {
  FormValues,
  SearchInputProps,
} from '@/components/layout/components/navbar/components/search-input/search-input.types';
import { useSearchParams } from 'react-router-dom';
import { useBlogContext } from '@/context/blogs/blog-context';

const SearchInput: React.FC<SearchInputProps> = ({ className, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [searchParams] = useSearchParams();
  const parsedQueryParams = qs.parse(searchParams.toString());

  const { control, watch } = useForm<FormValues>({
    defaultValues: parsedQueryParams || '',
  });

  const { setSearchText } = useBlogContext();

  useEffect(() => {
    // Set the initial search text from the query params
    if (parsedQueryParams?.searchText) {
      setSearchText(parsedQueryParams.searchText as string);
    }
  }, [parsedQueryParams, setSearchText]);

  const watchedSearchText = watch('searchText');

  useEffect(() => {
    // Update the context whenever the search text changes
    setSearchText(watchedSearchText ?? null);
  }, [watchedSearchText, setSearchText]);

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <Controller
        name='searchText'
        control={control}
        render={({ field }) => (
          <Input
            type='search'
            onChange={field.onChange}
            value={field.value ?? ''}
            placeholder='Type to search'
            className={cn(
              'h-9 w-[250px] pl-8 transition-all duration-300 focus-visible:ring-1',
              isExpanded
                ? 'max-sm:w-[160px]'
                : 'max-sm:w-9 max-sm:px-0 max-sm:pl-9',
              'bg-background text-foreground placeholder:text-muted-foreground',
              'border-input hover:bg-accent hover:text-accent-foreground',
              'text-sm focus-visible:ring-ring',
            )}
            {...props}
            ref={(e) => {
              field.ref(e);
              inputRef.current = e;
            }}
          />
        )}
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
