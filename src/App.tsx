import { Layout } from '@/components/layout';
import { Home, Write, About, Login, Register, NotFound } from '@/pages';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/write' element={<Write />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </>,
  ),
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
