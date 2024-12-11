import { useSetAtom } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { supabase } from '@/supabase';

export const useLogOut = () => {
  const setUser = useSetAtom(userAtom);

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
      } else {
        setUser(null);
        console.log('User logged out successfully');
      }
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }
  };

  return { logOut };
};
