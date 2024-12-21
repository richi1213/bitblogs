import { Button } from '@/components/ui/button';
import { AUTH_PATHS } from '@/routes/protected/is-authorized/auth/enums';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export const SignInButton: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Button asChild className='px-4 py-2'>
      <Link to={AUTH_PATHS.LOGIN}>{children}</Link>
    </Button>
  );
};
