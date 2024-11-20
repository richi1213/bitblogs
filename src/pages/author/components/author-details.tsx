import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Facebook, Github, Linkedin, Twitter, Users } from 'lucide-react';

const AuthorDetails = () => {
  return (
    <div>
      <Card className='mb-12 flex flex-col items-center rounded-xl border bg-card p-8 text-muted-foreground shadow-lg md:flex-row md:items-start'>
        <Avatar className='relative mb-4 mt-0 flex h-32 w-32 overflow-hidden rounded-full border-4 border-primary md:mb-0 md:mr-8 md:mt-6'>
          <AvatarFallback className='text-xl'>JD</AvatarFallback>
        </Avatar>
        <div className='flex flex-grow flex-col items-center md:items-start'>
          <CardHeader>
            <CardTitle className='mb-2 text-3xl'>Jane Doe</CardTitle>
          </CardHeader>
          <CardContent className='items-center md:items-start'>
            <CardDescription className='mb-4 text-center text-muted-foreground md:text-left'>
              Tech enthusiast, software engineer, and avid blogger. Passionate
              about AI, web development, and the future of technology.
            </CardDescription>
          </CardContent>
          <CardFooter className='flex flex-col items-start'>
            <div className='mb-4 flex justify-center space-x-4 md:justify-start'>
              <Button
                size='icon'
                variant='outline'
                className='rounded-full hover:bg-accent hover:text-accent-foreground'
                asChild
              >
                <a href='#' aria-label='Twitter'>
                  <Twitter />
                </a>
              </Button>
              <Button
                size='icon'
                variant='outline'
                className='rounded-full hover:bg-accent hover:text-accent-foreground'
                asChild
              >
                <a href='#' aria-label='Facebook'>
                  <Facebook className='h-5 w-5' />
                </a>
              </Button>
              <Button
                size='icon'
                variant='outline'
                className='rounded-full hover:bg-accent hover:text-accent-foreground'
                asChild
              >
                <a href='#' aria-label='LinkedIn'>
                  <Linkedin className='h-5 w-5' />
                </a>
              </Button>
              <Button
                size='icon'
                variant='outline'
                className='rounded-full hover:bg-accent hover:text-accent-foreground'
                asChild
              >
                <a href='#' aria-label='GitHub'>
                  <Github className='h-5 w-5' />
                </a>
              </Button>
            </div>
            <div className='flex justify-center space-x-4 text-xs text-muted-foreground md:justify-start'>
              <div className='flex items-center'>
                <Users className='h-4 w-4' />
                Followers
              </div>
              <div className='flex items-center'>
                <Users className='h-4 w-4' />
                Following
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default AuthorDetails;
