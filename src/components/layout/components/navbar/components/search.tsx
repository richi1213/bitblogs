import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tags = [
    { id: 1, name: 'AI' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'Machine Learning' },
    { id: 5, name: 'Node.js' },
    { id: 6, name: 'Python' },
    { id: 7, name: 'React' },
    { id: 8, name: 'TypeScript' },
  ];

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='relative'>
      <Button
        variant='ghost'
        size='icon'
        className='size-10 rounded-full'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search className='size-10 text-zinc-400' />
      </Button>
      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-64 space-y-4 rounded-lg bg-background p-4 text-foreground shadow-lg'>
          <div className='relative'>
            <Search className='absolute left-3 top-2.5 h-4 w-4 text-zinc-400' />
            <Input
              placeholder='Type to search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='border-border bg-background pl-9 text-foreground placeholder:text-foreground'
            />
          </div>
          <div className='space-y-2'>
            <h3 className='text-sm font-medium text-foreground'>Tags</h3>
            <div className='space-y-1'>
              {filteredTags.map((tag) => (
                <Button
                  key={tag.id}
                  variant='ghost'
                  className={cn(
                    'w-full justify-start text-foreground hover:bg-zinc-800',
                    searchQuery &&
                      tag.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) &&
                      'bg-background/50',
                  )}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchButton;
