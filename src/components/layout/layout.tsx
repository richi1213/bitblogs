import { Outlet } from 'react-router-dom';

import { Navbar } from './components/navbar';
import { Main } from './components/main';
import { Footer } from './components/footer';
import { PageContainer } from './components/page-container';

const Layout: React.FC = () => {
  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <Navbar />
      <Main>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Main>
      <Footer />
    </div>
  );
};

export default Layout;
