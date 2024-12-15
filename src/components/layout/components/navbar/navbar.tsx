import { Link } from 'react-router-dom';
import { SignInButton, LanguagePicker, ModeToggle } from './components';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';
import UserMenu from '@/pages/profile/components/user-menu';
import SearchInput from '@/components/layout/components/navbar/components/search-input/search-input';

const Navbar: React.FC = () => {
  const user = useAtomValue(userAtom);
  const { t } = useTranslation('navbar');

  return (
    <nav className='flex items-center justify-between border-b bg-background p-4 text-foreground'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex cursor-pointer items-center'>
          <Link to='/'>
            <span className='text-2xl font-bold hover:text-muted-foreground'>
              BitBlogs
            </span>
          </Link>
        </div>

        <div className='hidden space-x-4 md:flex'>
          <Link to='/' className='text-muted-foreground hover:text-foreground'>
            {t('home')}
          </Link>
          <Link
            to='/write'
            className='text-muted-foreground hover:text-foreground'
          >
            {t('write')}
          </Link>
          <Link
            to='/about'
            className='text-muted-foreground hover:text-foreground'
          >
            {t('about')}
          </Link>
        </div>

        <div className='flex items-center space-x-4'>
          <SearchInput />
          <LanguagePicker />
          <ModeToggle />
          {user.isLoggedIn ? (
            <UserMenu
              avatarUrl={user.userInfo?.avatar_url}
              name={user.userInfo?.full_name_en as string}
            />
          ) : (
            <SignInButton>{t('sign-in')}</SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
