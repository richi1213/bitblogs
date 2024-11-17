import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('footer');
  return (
    <footer className='mt-12 border-t bg-muted/50'>
      <div className='container mx-auto px-4 py-6 text-center text-muted-foreground'>
        <p>{t('2024-arr')}</p>
      </div>
    </footer>
  );
};

export default Footer;
