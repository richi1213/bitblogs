import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTagContext } from '@/context/tags/tag-context';
import { useBlogContext } from '@/context/blogs/blog-context';
import qs from 'qs';
import { useSearchParams } from 'react-router-dom';

const TagSlider: React.FC = () => {
  const { tags } = useTagContext();
  const { selectedTagIds, setSelectedTagIds } = useBlogContext();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const tagSlugToId = new Map(tags?.map((tag) => [tag.slug, tag.id]));

  // Initialize selectedTagIds from URL on mount
  useEffect(() => {
    const parsedParams = qs.parse(searchParams.toString());
    let slugsFromUrl: string[] = [];

    if (parsedParams.tags) {
      if (Array.isArray(parsedParams.tags)) {
        slugsFromUrl = parsedParams.tags.filter(
          (tag) => typeof tag === 'string',
        );
      } else {
        slugsFromUrl = [parsedParams.tags].filter(
          (tag) => typeof tag === 'string',
        );
      }
    }

    // Convert slugs to tag IDs
    const tagIdsFromSlugs = slugsFromUrl
      .map((slug) => tagSlugToId.get(slug))
      .filter(Boolean);
    setSelectedTagIds(tagIdsFromSlugs as number[]);
  }, []);

  // Update searchParams when selectedTagIds changes
  useEffect(() => {
    const slugsFromIds = selectedTagIds
      .map((id) => {
        const tag = tags?.find((tag) => tag.id === id);
        return tag?.slug;
      })
      .filter(Boolean);

    const updatedParams = new URLSearchParams(searchParams.toString());

    if (slugsFromIds.length) {
      updatedParams.set('tags', slugsFromIds.join(','));
    } else {
      updatedParams.delete('tags');
    }

    const searchText = searchParams.get('searchText');
    if (searchText) {
      updatedParams.set('searchText', searchText);
    }

    setSearchParams(updatedParams);
  }, [selectedTagIds, setSearchParams, tags, searchParams]);

  const toggleTag = (tagId: number) => {
    setSelectedTagIds((prevTags: number[]) => {
      const newTags = new Set(prevTags);
      if (newTags.has(tagId)) {
        newTags.delete(tagId);
      } else {
        newTags.add(tagId);
      }
      return Array.from(newTags);
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
              selectedTagIds?.includes(tag.id)
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
