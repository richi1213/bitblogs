import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTagContext } from '@/context/tags/tag-context';

const TagSlider: React.FC = () => {
  const { tags } = useTagContext();
  const [selectedTags, setSelectedTags] = useState<Set<number>>(new Set());
  const sliderRef = useRef<HTMLDivElement>(null);

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tagId)) {
        newSet.delete(tagId);
      } else {
        newSet.add(tagId);
      }
      return newSet;
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='relative'>
      <Button
        variant='outline'
        size='icon'
        className='absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full'
        onClick={() => scroll('left')}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>
      <div
        ref={sliderRef}
        className='flex w-full space-x-2 overflow-x-hidden py-2 pl-10 pr-10'
      >
        {tags?.map((tag) => (
          <Button
            key={tag.id}
            variant='outline'
            className={`shrink-0 rounded-full ${
              selectedTags.has(tag.id)
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : ''
            }`}
            onClick={() => toggleTag(tag.id)}
          >
            {tag.name}
          </Button>
        ))}
      </div>
      <Button
        variant='outline'
        size='icon'
        className='absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full'
        onClick={() => scroll('right')}
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default TagSlider;
