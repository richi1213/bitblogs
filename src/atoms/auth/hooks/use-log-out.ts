import { useSetAtom } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { supabase } from '@/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const useLogOut: () => { logout: () => Promise<void> } = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await supabase.auth.signOut();

      localStorage.removeItem('user-session');

      setUser({
        isLoggedIn: false,
        userInfo: null,
      });

      toast({
        variant: 'default',
        title: 'Logged out successfully!',
      });

      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { logout };
};

export default useLogOut;
