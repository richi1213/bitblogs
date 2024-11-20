import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { register } from '@/supabase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import Loading from '@/components/ui/loading';

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const { t } = useTranslation('login-and-register-page');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    mutate: registerAuthor,
    status,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
    },
    onError: (err) => {
      console.error('Registration error:', err);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    registerAuthor({ email: values.email, password: values.password });
  };

  return (
    <Card className='mx-auto w-full max-w-md text-card-foreground'>
      <CardHeader className='flex flex-col items-center text-center'>
        <CardTitle className='text-2xl'>{t('sign-up-for-bb')}</CardTitle>
        <CardDescription>{t('create-acc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormLabel>{t('password')}</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>{t('confirm-password')}</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className='text-sm text-red-500'>{error.message}</div>
            )}
            <Button
              type='submit'
              className='w-full bg-primary/85 text-foreground hover:bg-primary/90'
              disabled={status === 'pending'}
            >
              {status === 'pending' ? <Loading /> : t('sign-up')}
            </Button>
          </form>
        </Form>
        <div className='mt-4 text-center text-sm'>
          {t('already-have-acc')}{' '}
          <Link to='/login' className='text-primary hover:underline'>
            {t('login')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
