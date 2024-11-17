import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import navbarEn from '@/i18n/en/layout/navbar.json';
import footerEn from '@/i18n/en/layout/footer.json';
import homePageEn from '@/i18n/en/pages/home.json';
import writePageEn from '@/i18n/en/pages/write.json';
import aboutPageEn from '@/i18n/en/pages/about.json';
import loginAndRegisterPageEn from '@/i18n/en/pages/login-and-register.json';

import navbarKa from '@/i18n/ka/layout/navbar.json';
import footerKa from '@/i18n/ka/layout/footer.json';
import homePageKa from '@/i18n/ka/pages/home.json';
import writePageKa from '@/i18n/ka/pages/write.json';
import aboutPageKa from '@/i18n/ka/pages/about.json';
import loginAndRegisterPageKa from '@/i18n/ka/pages/login-and-register.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      navbar: navbarEn,
      footer: footerEn,
      'home-page': homePageEn,
      'write-page': writePageEn,
      'about-page': aboutPageEn,
      'login-and-register-page': loginAndRegisterPageEn,
    },
    ka: {
      navbar: navbarKa,
      footer: footerKa,
      'home-page': homePageKa,
      'write-page': writePageKa,
      'about-page': aboutPageKa,
      'login-and-register-page': loginAndRegisterPageKa,
    },
  },
  lng: 'en',
  fallbackLng: 'ka',
  defaultNS: 'navbar',
  ns: [
    'navbar',
    'footer',
    'home-page',
    'write-page',
    'about-page',
    'login-and-register-page',
  ],
});

export default i18n;
