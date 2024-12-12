import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';

const IsUnauthorizedGuard: React.FC = () => {
  const user = useAtomValue(userAtom);

  if (!user.isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default IsUnauthorizedGuard;
