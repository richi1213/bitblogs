import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import navbarEn from '@/i18n/en/layout/navbar.json';
import homePageEn from '@/i18n/en/pages/home.json';
import writePageEn from '@/i18n/en/pages/write.json';
import aboutPageEn from '@/i18n/en/pages/about.json';

import navbarKa from '@/i18n/ka/layout/navbar.json';
import homePageKa from '@/i18n/ka/pages/home.json';
import writePageKa from '@/i18n/ka/pages/write.json';
import aboutPageKa from '@/i18n/ka/pages/about.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      navbar: navbarEn,
      'home-page': homePageEn,
      'write-page': writePageEn,
      'about-page': aboutPageEn,
    },
    ka: {
      navbar: navbarKa,
      'home-page': homePageKa,
      'write-page': writePageKa,
      'about-page': aboutPageKa,
    },
  },
  lng: 'en',
  fallbackLng: 'ka',
  defaultNS: 'navbar',
  ns: ['navbar', 'home-page', 'write-page', 'about-page'],
});

export default i18n;
