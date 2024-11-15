import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSearch, setShowSearch] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    // You would typically also update your app's theme here
    // For example: document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className='flex items-center justify-between bg-white p-4 dark:bg-gray-800'>
      <div className='flex items-center'>
        <span className='text-xl font-bold text-gray-800 dark:text-white'>
          BitBlogs
        </span>
      </div>

      <div className='hidden space-x-4 md:flex'>
        <Link
          to='/'
          className='text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
        >
          Home
        </Link>
        <Link
          to='/write'
          className='text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
        >
          Write
        </Link>
        <Link
          to='/about'
          className='text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
        >
          About
        </Link>
      </div>

      <div className='flex items-center space-x-4'>
        {showSearch ? (
          <input
            type='search'
            placeholder='Search...'
            className='rounded-md border px-2 py-1 dark:bg-gray-700 dark:text-white'
          />
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className='text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
          >
            <Search className='h-5 w-5' />
            <span className='sr-only'>Search</span>
          </button>
        )}

        <button className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
          Sign in
        </button>

        <div className='relative'>
          <button className='text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'>
            <Globe className='h-5 w-5' />
            <span className='sr-only'>Change language</span>
          </button>
          {/* Language dropdown would go here */}
        </div>

        <button
          onClick={toggleTheme}
          className='text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
        >
          {theme === 'dark' ? (
            <Sun className='h-5 w-5' />
          ) : (
            <Moon className='h-5 w-5' />
          )}
          <span className='sr-only'>Toggle theme</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
