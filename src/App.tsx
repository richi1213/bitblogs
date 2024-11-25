import { ThemeProvider } from '@/components/theme-provider';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/auth';
import Loading from '@/components/ui/loading';

const App: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const validateSession = async () => {
      const storedSession = localStorage.getItem('user-session');
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        setUser({ ...parsedSession, isLoading: false });
      } else {
        setUser({ isLoading: false, isLoggedIn: false, userInfo: null });
      }
    };

    validateSession();
  }, [setUser]);

  if (user.isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
