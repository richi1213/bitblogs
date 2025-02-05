import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

const AuthorTabs: React.FC = () => {
  const { t: skillsT } = useTranslation('navbar');

  const skills = [
    skillsT('js'),
    skillsT('react'),
    skillsT('node'),
    skillsT('py'),
  ];

  return (
    <div className='flex flex-col'>
      <Tabs defaultValue='articles' className=''>
        <TabsList className='mb-6 grid h-9 w-full grid-cols-12'>
          <TabsTrigger value='articles' className='col-span-6'>
            Articles
          </TabsTrigger>
          <TabsTrigger value='about' className='col-span-6'>
            About
          </TabsTrigger>
        </TabsList>
        <TabsContent value='articles' className='flex flex-col gap-6'>
          {/* <BlogCard
            title={blogT('blog-title')}
            author={blogT('author-name')}
            date={blogT('publication-date')}
            readTime={blogT('read-time')}
            excerpt={blogT('text')}
            tags={[blogT('tag1'), blogT('tag2'), blogT('tag3')]}
            imageUrl='https://g-zwkebgiacpe.vusercontent.net/placeholder.svg?height=200&width=400'
            href='/blog/post-slug'
          /> */}
        </TabsContent>
        <TabsContent value='about'>
          <Card className='rounded-xl border bg-card text-card-foreground shadow-sm'>
            <CardHeader className='text-sm font-semibold leading-none tracking-tight'>
              About Jane Doe
            </CardHeader>
            <CardDescription className='px-6 py-0'>
              <p className='text-muted-foreground'>
                Jane Doe is a seasoned software engineer with over a decade of
                experience in web development. She specializes in JavaScript,
                React, and Node.js, and has a keen interest in emerging
                technologies like AI and blockchain. Jane is a frequent speaker
                at tech conferences and contributes to various open-source
                projects.
              </p>
            </CardDescription>
            <CardFooter className='flex flex-col items-start'>
              <h3 className='mb-2 mt-4 font-semibold'>Skills</h3>
              <div className='flex flex-wrap gap-2'>
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant='secondary'
                    className='rounded-full text-primary'
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthorTabs;
