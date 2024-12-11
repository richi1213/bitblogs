import { ThemeProvider } from '@/components/theme-provider';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useEffect } from 'react';
import { useSession } from '@/supabase/auth/hooks/sessions/use-session';

const App: React.FC = () => {
  const { initializeSession } = useSession();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
