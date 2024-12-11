import { useSetAtom } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { supabase } from '@/supabase';

export const useSession = () => {
  const setUser = useSetAtom(userAtom);

  const initializeSession = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (session) {
      setUser(session);
    } else {
      console.log('No session found:', error);
    }
  };

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();

      if (data?.session) {
        setUser(data.session);
      } else {
        console.log('Session refresh failed:', error);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  return { initializeSession, refreshSession };
};
