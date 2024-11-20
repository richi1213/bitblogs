import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

type BlogCardProps = {
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  imageUrl: string;
  href: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
  title = 'The Future of Blockchain Technology',
  author = 'John Doe',
  date = 'May 15, 2023',
  readTime = '5 min read',
  excerpt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',
  tags = ['Blockchain', 'Technology', 'Future'],
  imageUrl = '/placeholder.svg',
  href = '#',
}) => {
  return (
    <Link to={href}>
      <Card className='overflow-hidden p-4 transition-all hover:shadow-lg'>
        <div className='relative'>
          <img
            src={imageUrl}
            alt={title}
            className='h-[200px] w-full rounded-lg object-cover'
          />
        </div>
        <CardHeader>
          <div className='space-y-1'>
            <h2 className='text-2xl font-bold tracking-tight hover:text-primary'>
              {title}
            </h2>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <User className='size-4' />
                <span className='hover:underline'>{author}</span>
              </div>
              <span>•</span>
              <span>{date}</span>
              <span>•</span>
              <div className='flex items-center gap-1'>
                <Clock className='size-4' />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>{excerpt}</p>
        </CardContent>
        <CardFooter>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Badge key={tag} variant='secondary'>
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
