import { useState } from 'react';
import { Globe } from 'lucide-react';
import i18n from '@/i18n';

export const LanguagePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang: 'en' | 'ka') => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        className='text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className='h-5 w-5' />
        <span className='sr-only'>Change language</span>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-32 rounded-md bg-white shadow-lg dark:bg-gray-800'>
          <ul className='py-1 text-sm text-gray-700 dark:text-gray-300'>
            <li>
              <button
                className='block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700'
                onClick={() => changeLanguage('en')}
              >
                English
              </button>
            </li>
            <li>
              <button
                className='block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700'
                onClick={() => changeLanguage('ka')}
              >
                ქართული
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
