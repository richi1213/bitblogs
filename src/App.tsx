import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/auth';
import Loading from '@/components/ui/loading';
import { BlogProvider } from '@/context/blogs/blog-context';

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
    <BlogProvider>
      <RouterProvider router={router} />
    </BlogProvider>
  );
};

export default App;
