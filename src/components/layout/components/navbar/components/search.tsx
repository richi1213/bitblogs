import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export const SearchButton: React.FC = () => {
  const { t } = useTranslation('navbar');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const tags = [
    { id: 1, name: t('ai') },
    { id: 2, name: t('ds') },
    { id: 3, name: t('js') },
    { id: 4, name: t('ml') },
    { id: 5, name: t('node') },
    { id: 6, name: t('py') },
    { id: 7, name: t('react') },
    { id: 8, name: t('ts') },
  ];

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={containerRef}>
      <Button
        variant='ghost'
        size='icon'
        className='size-10 rounded-full'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search className='size-10 text-zinc-400' />
      </Button>
      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-64 space-y-4 rounded-lg border border-border bg-background p-4 text-foreground shadow-lg'>
          <div className='relative'>
            <Search className='absolute left-3 top-2.5 h-4 w-4 text-zinc-400' />
            <Input
              placeholder={t('type-to-s')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='border-border bg-background pl-9 text-foreground placeholder:text-foreground'
            />
          </div>
          <div className='space-y-2'>
            <h3 className='text-sm font-medium text-foreground'>{t('tags')}</h3>
            <div className='space-y-1'>
              {filteredTags.map((tag) => (
                <Button
                  key={tag.id}
                  variant='ghost'
                  className={cn(
                    'w-full justify-start text-secondary-foreground',
                    searchQuery &&
                      tag.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
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
