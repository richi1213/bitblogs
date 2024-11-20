import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Users, Zap } from 'lucide-react';

const WhatWeOffer: React.FC = () => {
  return (
    <section className='space-y-8'>
      <h2 className='text-center text-3xl font-semibold'>What We Offer</h2>
      <div className='grid gap-6 md:grid-cols-3'>
        <Card>
          <CardHeader className='space-y-1.5 p-6'>
            <BookOpen className='mb-2 size-10 text-primary' />
            <CardTitle className='text-sm'>Rich Content</CardTitle>
          </CardHeader>
          <CardDescription className='p-6 pt-0'>
            <p>
              Access a wide range of articles, tutorials, and insights on the
              latest tech trends and best practices.
            </p>
          </CardDescription>
        </Card>
        <Card>
          <CardHeader className='space-y-1.5 p-6'>
            <Users className='mb-2 size-10 text-primary' />
            <CardTitle className='text-sm'>Vibrant Community</CardTitle>
          </CardHeader>
          <CardDescription className='p-6 pt-0'>
            <p>
              Connect with like-minded individuals, share your knowledge, and
              grow your professional network.
            </p>
          </CardDescription>
        </Card>
        <Card>
          <CardHeader className='space-y-1.5 p-6'>
            <Zap className='mb-2 size-10 text-primary' />
            <CardTitle className='text-sm'>Cutting-edge Topics</CardTitle>
          </CardHeader>
          <CardDescription className='p-6 pt-0'>
            <p>
              Stay ahead of the curve with content covering emerging
              technologies and innovative solutions.
            </p>
          </CardDescription>
        </Card>
      </div>
    </section>
  );
};

export default WhatWeOffer;
