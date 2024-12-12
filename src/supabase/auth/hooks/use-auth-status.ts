import { getMe } from '@/supabase/auth';
import { useState, useEffect } from 'react';

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      const user = await getMe();
      console.log(user);
      setIsLoggedIn(!!user);
      setIsLoading(false);
    };

    checkUser();
  }, []);

  return { isLoggedIn, isLoading };
};
