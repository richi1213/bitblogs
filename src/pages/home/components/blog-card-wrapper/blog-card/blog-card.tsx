import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Dot, User } from 'lucide-react';
import { BlogCardProps } from '@/pages/home/components/blog-card-wrapper/blog-card/blog-card.types';
import { formatBlogDate } from '@/utils/dates/date-formatter';
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '@/supabase/auth';
import Loading from '@/components/ui/loading';
import { fetchTagsByIds } from '@/supabase/api/tags';
import { Badge } from '@/components/ui/badge';

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  if (!blog) {
    return <div>No blog data available</div>;
  }

  const { title_en, created_at, image_url, description_en, user_id, tag_ids } =
    blog;

  const blogImageUrl = image_url
    ? `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}/${image_url}`
    : '';

  const formattedDate = formatBlogDate(created_at);

  const { data: authorProfile, isLoading: isAuthorLoading } = useQuery({
    queryKey: ['userProfile', user_id],
    queryFn: () => fetchUserProfile(user_id as string),
    enabled: !!user_id,
  });

  const { data: tags, isLoading: areTagsLoading } = useQuery({
    queryKey: ['tags', tag_ids],
    queryFn: () => fetchTagsByIds(tag_ids || []),
    enabled: !!(tag_ids && tag_ids.length > 0),
  });

  if (isAuthorLoading || areTagsLoading) {
    return <Loading />;
  }

  const authorName = authorProfile?.full_name_en || 'Unknown Author';

  return (
    <Card className='overflow-hidden p-4 transition-all hover:shadow-lg'>
      <div className='relative'>
        <img
          src={blogImageUrl}
          alt={title_en || ''}
          className='h-[200px] w-full rounded-lg object-cover'
        />
      </div>
      <CardHeader>
        <div className='space-y-1'>
          <h2 className='text-2xl font-bold tracking-tight hover:text-primary'>
            {title_en}
          </h2>
          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <User className='size-4' />
              <span className='hover:underline'>{authorName}</span>
            </div>
            <Dot />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>
          {description_en || 'No description available'}
        </p>
      </CardContent>
      <CardFooter>
        <div className='flex flex-wrap gap-2'>
          {tags?.map((tag) => (
            <Badge
              key={tag.id}
              className='badge badge-secondary cursor-pointer bg-secondary text-accent-foreground'
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
