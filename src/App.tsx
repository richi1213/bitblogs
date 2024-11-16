import { Layout } from '@/components/layout';
import { Home, Write, About } from '@/pages';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/write' element={<Write />} />
        <Route path='/about' element={<About />} />
      </Route>

      <Route path='*' element={<Navigate to='/' replace />} />
    </>,
  ),
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
