import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { ModeToggle } from '@/components/layout/components/navbar/components/mode-toggle';
import SignInButton from '@/components/layout/components/navbar/components/sign-in-button';
import SearchButton from '@/components/layout/components/navbar/components/search';

const Navbar: React.FC = () => {
  return (
    <nav className='flex items-center justify-between border-b bg-background p-4 text-foreground'>
      <div className='flex cursor-pointer items-center'>
        <span className='text-xl font-bold'>BitBlogs</span>
      </div>

      <div className='hidden space-x-4 md:flex'>
        <Link to='/' className='text-muted-foreground hover:text-foreground'>
          Home
        </Link>
        <Link
          to='/write'
          className='text-muted-foreground hover:text-foreground'
        >
          Write
        </Link>
        <Link
          to='/about'
          className='text-muted-foreground hover:text-foreground'
        >
          About
        </Link>
      </div>

      <div className='flex items-center space-x-4'>
        <SearchButton />

        <SignInButton>Sign in</SignInButton>

        <div className='relative'>
          <button className='text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'>
            <Globe className='size-5' />
            <span className='sr-only'>Change language</span>
          </button>
          {/* Language dropdown would go here */}
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
