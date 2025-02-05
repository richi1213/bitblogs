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
        className='text-foreground hover:text-accent focus:outline-hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className='h-5 w-5' />
        <span className='sr-only'>Change language</span>
      </button>

      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-32 rounded-md bg-popover shadow-lg'>
          <ul className='py-1 text-sm'>
            <li>
              <button
                className='block w-full px-4 py-2 text-left text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden'
                onClick={() => changeLanguage('en')}
              >
                English
              </button>
            </li>
            <li>
              <button
                className='block w-full px-4 py-2 text-left text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden'
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
