import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { generateAvatarUrl } from '@/pages/edit-profile/utils/avatars';
import { updateUserProfile } from '@/supabase/auth';
import { useNavigate } from 'react-router-dom';
import { avatarSeeds } from '@/pages/edit-profile/utils/avatars';
import { z } from 'zod';
import { createEditFormSchema } from '@/pages/edit-profile/utils/schemas/createEditFormSchema';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const EditUserForm: React.FC = () => {
  const user = useAtomValue(userAtom);
  const { toast } = useToast();

  const userId = user?.user.id;
  const userInfo = user?.user.user_metadata;
  const avatarUrl = user?.user?.identities?.[0]?.identity_data?.avatar_url;

  console.log(userId);

  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    avatarUrl || generateAvatarUrl('default'),
  );
  const navigate = useNavigate();

  const { t } = useTranslation('edit-profile-page');

  const formSchema = createEditFormSchema(t);

  type FormFields = z.infer<typeof formSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'full-name-en': userInfo?.full_name_en || '',
      'full-name-ka': userInfo?.full_name_ka || '',
      avatar_url: selectedAvatar,
    },
  });

  const {
    mutate: updateProfileInfo,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: (formValues: FormFields) => {
      if (!user?.user) {
        return Promise.reject(new Error('User information is missing.'));
      }

      return updateUserProfile({
        id: userId,
        full_name_en: formValues['full-name-en'],
        full_name_ka: formValues['full-name-ka'],
        avatar_url: formValues.avatar_url,
      });
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        description: 'You have successfully updated your profile!',
      });
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (formValues: FormFields) => {
    updateProfileInfo(formValues);
  };

  return (
    <div className='mx-auto max-w-[425px]'>
      <h2 className='mb-4 text-lg font-semibold'>Edit Profile</h2>
      <p className='mb-6 text-sm'>
        Make changes to your profile here. Click save when you're done.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            name='full-name-en'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name (English)</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your full name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='full-name-ka'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name (Georgian)</FormLabel>
                <FormControl>
                  <Input placeholder='შეიყვანეთ თქვენი სახელი' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='avatar_url'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant='outline' className='w-full'>
                        <Avatar className='mr-2'>
                          <AvatarImage
                            src={selectedAvatar}
                            alt='Selected avatar'
                          />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                        Choose Avatar
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px]'>
                      <RadioGroup
                        value={selectedAvatar}
                        onValueChange={(value) => {
                          setSelectedAvatar(value);
                          field.onChange(value);
                        }}
                        className='grid grid-cols-2 gap-4'
                      >
                        {avatarSeeds.map((seed, index) => {
                          const avatarUrl = generateAvatarUrl(seed);
                          return (
                            <div
                              key={index}
                              className='flex items-center justify-center'
                            >
                              <RadioGroupItem
                                value={avatarUrl}
                                id={`avatar-${index}`}
                                className='hidden'
                              />
                              <label
                                htmlFor={`avatar-${index}`}
                                className={`flex cursor-pointer items-center justify-center ${
                                  selectedAvatar === avatarUrl
                                    ? 'rounded-md ring-2 ring-blue-500'
                                    : ''
                                }`}
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={avatarUrl}
                                    alt={`Avatar ${index + 1}`}
                                  />
                                  <AvatarFallback>?</AvatarFallback>
                                </Avatar>
                              </label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full text-foreground'>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>

          {isError && (
            <p className='text-red-500'>
              Error updating profile: {error?.message}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default EditUserForm;
