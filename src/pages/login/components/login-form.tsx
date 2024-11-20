import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { login } from '@/supabase/auth';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import Loading from '@/components/ui/loading';
import { AlertDestructive } from '@/pages/login/components/alert-destructive';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export function LoginForm() {
  const { t } = useTranslation('login-and-register-page');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    mutate: loginAuthor,
    status,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (err) => {
      console.error('Login error:', err);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginAuthor({ email: values.email, password: values.password });
  };

  const errorMessage =
    error instanceof Error
      ? error.message
      : (error as any)?.error_description || t('unknown-error');

  return (
    <Card className='mx-auto w-full max-w-md text-card-foreground'>
      <CardHeader className='flex flex-col items-center text-center'>
        <CardTitle className='text-2xl'>{t('login-to-bb')}</CardTitle>
        <CardDescription>{t('enter-your-info')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='john@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <div className='flex items-center'>
                    <FormLabel>{t('password')}</FormLabel>
                    <Link
                      to='/'
                      className='ml-auto inline-block text-sm text-primary hover:underline'
                    >
                      {t('forgot-password')}
                    </Link>
                  </div>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full bg-primary/85 text-foreground hover:bg-primary/90'
              disabled={status === 'pending'}
            >
              {status === 'pending' ? <Loading /> : t('sign-up')}
            </Button>
          </form>
        </Form>

        {status === 'error' && (
          <div className='mt-4'>
            <AlertDestructive message={errorMessage} />
          </div>
        )}

        <div className='mt-4 text-center text-sm'>
          {t('dont-have-acc')}{' '}
          <Link to='/register' className='text-primary hover:underline'>
            {t('sign-up')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
