import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';

const IsUnauthorizedGuard: React.FC = () => {
  const location = useLocation();
  const user = useAtomValue(userAtom);

  if (!user.isLoggedIn) {
    return <Navigate state={{ from: location }} to='/login' />;
  }

  return <Outlet />;
};

export default IsUnauthorizedGuard;
