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

type FormValues = {
  full_name_en: string;
  avatar: string;
};

const avatars = [
  'https://api.dicebear.com/9.x/avataaars/svg',
  'https://api.dicebear.com/9.x/avataaars/svg',
  'https://api.dicebear.com/9.x/avataaars/svg',
  'https://api.dicebear.com/9.x/avataaars/svg',
  'https://api.dicebear.com/9.x/avataaars/svg',
];

const EditUserForm: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const form = useForm<FormValues>({
    defaultValues: {
      full_name_en: '',
      avatar: selectedAvatar,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log('Form values:', values);
  };

  return (
    <div className='mx-auto max-w-[425px]'>
      <h2 className='mb-4 text-lg font-semibold'>Edit Profile</h2>
      <p className='mb-6 text-sm text-muted'>
        Make changes to your profile here. Click save when you're done.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Full Name */}
          <FormField
            name='full_name_en'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your full name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Avatar Selection */}
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
                        {avatars.map((avatar, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-center'
                          >
                            <RadioGroupItem
                              value={avatar}
                              id={`avatar-${index}`}
                              className='hidden'
                            />
                            <label
                              htmlFor={`avatar-${index}`}
                              className={`flex cursor-pointer items-center justify-center ${
                                selectedAvatar === avatar
                                  ? 'rounded-md ring-2 ring-blue-500'
                                  : ''
                              }`}
                            >
                              <Avatar>
                                <AvatarImage
                                  src={avatar}
                                  alt={`Avatar ${index + 1}`}
                                />
                                <AvatarFallback>?</AvatarFallback>
                              </Avatar>
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditUserForm;
