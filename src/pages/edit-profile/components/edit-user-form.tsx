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
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { generateAvatarUrl } from '@/pages/edit-profile/utils/avatars';
import { updateUserProfile } from '@/supabase/auth';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  full_name_en: string;
  full_name_ka: string;
  avatar: string;
};

const EditUserForm: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);
  const userInfo = user?.userInfo;
  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    userInfo?.avatar_url || generateAvatarUrl('default'),
  );

  const avatarSeeds = [
    'user1',
    'user2',
    'user3',
    'user4',
    'user5',
    'user6',
    'user7',
  ];

  const form = useForm<FormValues>({
    defaultValues: {
      full_name_en: userInfo?.full_name_en || '',
      full_name_ka: userInfo?.full_name_ka || '',
      avatar: selectedAvatar,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!userInfo) {
      console.error('User info is missing.');
      return;
    }

    try {
      await updateUserProfile({
        id: userInfo.id,
        full_name_en: values.full_name_en,
        full_name_ka: values.full_name_ka,
        avatar_url: values.avatar,
      });

      setUser((prev) => ({
        ...prev,
        userInfo: {
          ...prev?.userInfo,
          full_name_en: values.full_name_en,
          full_name_ka: values.full_name_ka,
          avatar_url: values.avatar,
          email: prev?.userInfo?.email || null,
          id: prev?.userInfo?.id || '',
          updated_at: prev?.userInfo?.updated_at || null,
          username: prev?.userInfo?.username || null,
        },
      }));

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
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
            name='full_name_en'
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
            name='full_name_ka'
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
            name='avatar'
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
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditUserForm;
