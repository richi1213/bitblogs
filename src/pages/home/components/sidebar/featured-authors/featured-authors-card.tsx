import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Author = {
  name: string;
  role: string;
  avatar?: string;
  roleColor?: string;
};

type FeaturedAuthorsProps = {
  authors?: Author[];
};

const FeaturedAuthorsCard: React.FC<FeaturedAuthorsProps> = ({
  authors = [
    {
      name: 'Alice Johnson',
      role: 'Blockchain Enthusiast',
      roleColor: 'text-blue-500',
    },
    {
      name: 'Bob Smith',
      role: 'Crypto Analyst',
      roleColor: 'text-green-500',
    },
    {
      name: 'Carol Williams',
      role: 'Tech Journalist',
      roleColor: 'text-orange-500',
    },
  ],
}) => {
  return (
    <Card className='w-full max-w-md bg-white shadow-sm'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-lg font-semibold'>
          Featured Authors
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        {authors.map((author) => (
          <div key={author.name} className='flex items-center gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className='bg-muted'>
                {author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span className='font-medium'>{author.name}</span>
              <span className={author.roleColor}>{author.role}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FeaturedAuthorsCard;
