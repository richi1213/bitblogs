import { toast } from '@/hooks/use-toast';
import { supabase } from '@/supabase';
import { fetchUserProfile } from '@/supabase/auth';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { TriangleAlert } from 'lucide-react';

type UseLoginHandlers = {
  handleLoginSuccess: () => Promise<void>;
  handleLoginError: (err: unknown) => void;
};

const useLoginHandlers: () => UseLoginHandlers = () => {
  const location = useLocation();

  const redirectPath = location?.state?.from || '/';

  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleLoginSuccess: UseLoginHandlers['handleLoginSuccess'] =
    async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const profile = await fetchUserProfile(user.id);

          if (!profile) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Could not fetch user profile.',
            });
            return;
          }

          setUser({
            isLoggedIn: true,
            userInfo: {
              email: user.email ?? null,
              username: profile.username || null,
              avatar_url: profile.avatar_url || null,
              full_name_en: profile.full_name_en || null,
              full_name_ka: profile.full_name_ka || null,
              id: profile.id,
              updated_at: profile.updated_at || null,
            },
          });

          toast({
            variant: 'default',
            title: 'Success!',
            description: 'You have logged in successfully.',
            duration: 2000,
          });

          navigate(redirectPath);
        }
      } catch (err) {
        console.error('Error handling login:', err);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An error occurred while logging in.',
        });
      }
    };

  const handleLoginError: UseLoginHandlers['handleLoginError'] = (err) => {
    const errorMessage =
      (err as { message?: string })?.message || 'An unknown error occurred';
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: (
        <div className='flex items-center'>
          <TriangleAlert className='mr-2' />
          <div>{errorMessage}</div>
        </div>
      ),
      duration: 2000,
    });
  };

  return { handleLoginSuccess, handleLoginError };
};

export default useLoginHandlers;
