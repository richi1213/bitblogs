import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Navbar from '@/components/navbar';

const Home: React.FC = () => <div>Home Page</div>;
const Write: React.FC = () => <div>Write Page</div>;
const About: React.FC = () => <div>About Page</div>;

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className='p-4'>
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/write' element={<Write />} />
        <Route path='/about' element={<About />} />
      </Route>
      {/* Catch-all redirect to Home */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </>,
  ),
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
