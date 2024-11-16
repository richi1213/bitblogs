import { Outlet } from 'react-router-dom';

import { Navbar } from './components/navbar';
import { Main } from './components/main';
import { Footer } from './components/footer';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
