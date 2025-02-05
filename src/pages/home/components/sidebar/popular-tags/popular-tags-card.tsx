import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

type PopularTagsProps = {
  tags?: {
    name: string;
    href?: string;
  }[];
};

const PopularTagsCard: React.FC<PopularTagsProps> = ({
  tags = [
    { name: 'Blockchain', href: '#blockchain' },
    { name: 'Cryptocurrency', href: '#cryptocurrency' },
    { name: 'Technology', href: '#technology' },
    { name: 'Programming', href: '#programming' },
    { name: 'AI', href: '#ai' },
    { name: 'Machine Learning', href: '#machine-learning' },
  ],
}) => {
  const { t } = useTranslation('home-page');

  return (
    <Card className='w-full max-w-md bg-background shadow-xs'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-lg font-semibold'>
          {t('popular-tags')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <Badge
              key={tag.name}
              className='cursor-pointer rounded-md bg-secondary px-3 py-1 text-xs font-medium text-accent-foreground transition-colors'
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularTagsCard;
