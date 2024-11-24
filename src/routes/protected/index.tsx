import { Navigate, Outlet } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/auth';

const ProtectedRoute: React.FC = () => {
  const [user] = useAtom(userAtom);

  if (!user.isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
