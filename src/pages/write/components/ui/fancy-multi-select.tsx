import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { useTagContext } from '@/context/tags/tag-context';
import { Tag } from '@/supabase/api/tags/index.types';
import { useCallback, useEffect, useRef, useState } from 'react';

type FancyMultiSelectProps = {
  selectedTagIds: number[];
  onTagsChange: (tags: Tag[]) => void;
};

export function FancyMultiSelect({
  selectedTagIds,
  onTagsChange,
}: FancyMultiSelectProps) {
  const { tags } = useTagContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (tags) {
      const initialSelected = tags.filter((tag) =>
        selectedTagIds.includes(tag.id),
      );
      setSelected(initialSelected);
    }
  }, [tags, selectedTagIds]);

  const handleUnselect = useCallback(
    (tag: Tag) => {
      setSelected((prev) => {
        const newSelected = prev.filter((s) => s.slug !== tag.slug);
        onTagsChange(newSelected);
        return newSelected;
      });
    },
    [onTagsChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              onTagsChange(newSelected);
              return newSelected;
            });
          }
        }
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [onTagsChange],
  );

  const selectables = tags
    ? tags.filter((tag) => !selected.some((s) => s.slug === tag.slug))
    : [];

  return (
    <Command
      onKeyDown={handleKeyDown}
      className='overflow-visible bg-transparent'
    >
      <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex flex-wrap gap-1'>
          {selected.map((tag) => (
            <Badge key={tag.slug} variant='secondary'>
              {tag.name}
              <button
                className='ml-1 rounded-full outline-hidden ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(tag);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(tag)}
              >
                <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={(value) => setInputValue(value)}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder='Choose tags'
            className='ml-2 flex-1 bg-transparent outline-hidden placeholder:text-muted-foreground'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-hidden animate-in'>
              <CommandGroup className='h-full overflow-auto'>
                {selectables.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      if (selected.some((s) => s.slug === tag.slug)) return;
                      const newSelected = [...selected, tag];
                      setSelected(newSelected);
                      onTagsChange(newSelected);
                    }}
                    className='cursor-pointer'
                  >
                    {tag.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
