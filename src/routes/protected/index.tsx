import Loading from '@/components/ui/loading';
import { useAuthStatus } from '@/supabase/auth/hooks/use-auth-status';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn, isLoading } = useAuthStatus();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
