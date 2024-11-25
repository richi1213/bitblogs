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
      setUser((prev) => ({ ...prev, isLoading: true }));

      await supabase.auth.signOut();

      localStorage.removeItem('user-session');

      setUser({
        isLoading: false,
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

      setUser((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return { logout };
};

export default useLogOut;
