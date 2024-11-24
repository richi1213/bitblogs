import { ThemeProvider } from '@/components/theme-provider';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
