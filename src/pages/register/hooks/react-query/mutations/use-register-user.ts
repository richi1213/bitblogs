import { register } from '@/supabase/auth';
import { useMutation } from '@tanstack/react-query';

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: register,
    onError: (err) => {
      console.error('Registration error:', err);
    },
  });
};
