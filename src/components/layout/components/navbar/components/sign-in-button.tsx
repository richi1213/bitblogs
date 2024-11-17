import { Button } from '@/components/ui/button';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export const SignInButton: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Button
      asChild
      className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
    >
      <Link to='/login'>{children}</Link>
    </Button>
  );
};
