import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

export function RegisterForm() {
  const { t } = useTranslation('login-and-register-page');
  return (
    <Card className='mx-auto w-full max-w-md text-card-foreground'>
      <CardHeader className='flex flex-col items-center text-center'>
        <CardTitle className='text-2xl'>{t('sign-up-for-bb')}</CardTitle>
        <CardDescription>{t('create-acc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>{t('name')}</Label>
            <Input id='name' type='name' placeholder='John Doe' required />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>{t('email')}</Label>
            <Input
              id='email'
              type='email'
              placeholder='john@example.com'
              required
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>{t('password')}</Label>
            </div>
            <Input id='password' type='password' required />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>{t('confirm-password')}</Label>
            </div>
            <Input id='password' type='password' required />
          </div>
          <Button
            type='submit'
            className='w-full bg-primary/85 text-foreground hover:bg-primary/90'
          >
            {t('sign-up')}
          </Button>
          <Button variant='outline' className='w-full'>
            {t('sign-up-w-google')}
          </Button>
        </div>
        <div className='mt-4 text-center text-sm'>
          {t('already-have-acc')}
          <Link to='/login' className='text-primary hover:underline'>
            {t('login')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
