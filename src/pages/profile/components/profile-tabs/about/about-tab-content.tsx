import { userAtom } from '@/atoms/auth';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';

const AboutTabContent: React.FC = () => {
  const user = useAtomValue(userAtom);

  const { t: skillsT } = useTranslation('navbar');

  const skills = [
    skillsT('js'),
    skillsT('react'),
    skillsT('node'),
    skillsT('py'),
  ];
  return (
    <TabsContent value='about'>
      <Card className='rounded-xl border bg-card text-card-foreground shadow'>
        <CardHeader className='text-sm font-semibold leading-none tracking-tight'>
          {`About ${user.userInfo?.full_name_en}`}
        </CardHeader>
        <CardDescription className='px-6 py-0'>
          <p className='text-muted-foreground'>
            {`${user.userInfo?.full_name_en} is a seasoned software engineer with over a decade of
        experience in web development. He specializes in JavaScript,
        React, and Node.js, and has a keen interest in emerging
        technologies like AI and blockchain. Jane is a frequent speaker
        at tech conferences and contributes to various open-source
        projects.`}
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
  );
};

export default AboutTabContent;
