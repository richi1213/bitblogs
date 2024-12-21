import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';
import { AUTH_PATHS } from '@/routes/protected/is-authorized/auth/enums';

const IsUnauthorizedGuard: React.FC = () => {
  const location = useLocation();
  const user = useAtomValue(userAtom);

  if (!user.isLoggedIn) {
    return <Navigate state={{ from: location }} to={AUTH_PATHS.LOGIN} />;
  }

  return <Outlet />;
};

export default IsUnauthorizedGuard;
