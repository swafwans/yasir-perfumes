
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface NavLinkItem {
  id: number;
  text: string;
  path: string;
  enabled: boolean;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  enabled: boolean;
}

export interface SiteSettings {
  logoUrl: string;
  navLinks: NavLinkItem[];
  facebook: string;
  instagram: string;
  youtube: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroImageUrl: string;
  primaryColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  accentTextColor: string;
  cardShadow: boolean;
  cardOutline: boolean;
  privacyPolicyContent: string;
  termsContent: string;
  refundContent: string;
  containerWidth: string;
  cardImageHeight: string;
  banners: Banner[];
  cardBorderRadius: number;
  cardPadding: number;
  cardTitleFontSize: string;
  cardTitleFontWeight: string;
  cardPriceFontSize: string;
  cardButtonText: string;
  logoWidth: number;
  logoHeight: number;
  homeAboutImageUrl: string;
  homeParallaxImageUrl: string;
  homeParallaxTitle: string;
  homeParallaxSubtitle: string;
  homeParallaxTitleColor: string;
  homeParallaxSubtitleColor: string;
  aboutPageHistoryImageUrl: string;
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  sectionTextColor: string;
  heroTitleFontSize: string;
  heroTitleFontFamily: string;
  heroSubtitleFontSize: string;
  pageTitleFontSize: string;
  sectionTitleFontSize: string;
  sectionTitleFontFamily: string;
  sectionSubtitleFontSize: string;
  sectionTextFontSize: string;
  showAuthButtons: boolean;
}

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const initialNavLinks: NavLinkItem[] = [
  { id: 1, text: 'Home', path: '/', enabled: true },
  { id: 2, text: 'Shopping', path: '/shopping', enabled: true },
  { id: 3, text: 'About Us', path: '/about', enabled: true },
  { id: 4, text: 'Services', path: '/services', enabled: true },
  { id: 5, text: 'Contact Us', path: '/contact', enabled: true },
  { id: 6, text: 'Favorites', path: '/favorites', enabled: true },
];

const initialSettings: SiteSettings = {
    logoUrl: 'https://swafwans.github.io/Whitespot/logo.png',
    navLinks: initialNavLinks,
    facebook: 'https://www.facebook.com/profile.php?id=100091728812950',
    instagram: 'https://www.instagram.com/yasirperfumes/?hl=en',
    youtube: 'https://www.youtube.com/channel/UCu9R2vLWv_EGjtx2AhqBZGw',
    heroTitle: 'The Essence of Luxury',
    heroSubtitle: 'Discover a world of exquisite fragrances, crafted for the modern connoisseur.',
    heroButtonText: 'Explore Collection',
    heroImageUrl: 'https://picsum.photos/seed/hero/1920/1080',
    primaryColor: '#F59E0B',
    backgroundColor: '#030712',
    cardBackgroundColor: '#111827',
    textColor: '#E5E7EB',
    accentTextColor: '#FFFFFF',
    cardShadow: true,
    cardOutline: false,
    privacyPolicyContent: '<h2>Privacy Policy</h2><p>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website. We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>',
    termsContent: '<h2>Terms & Conditions</h2><p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trade mark law.</p>',
    refundContent: '<h2>Refund & Cancellation Policy</h2><p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.</p>',
    containerWidth: 'max-w-7xl',
    cardImageHeight: 'h-64',
    banners: [],
    cardBorderRadius: 8,
    cardPadding: 1,
    cardTitleFontSize: 'text-lg',
    cardTitleFontWeight: 'font-semibold',
    cardPriceFontSize: 'text-base',
    cardButtonText: 'Add to Cart',
    logoWidth: 150,
    logoHeight: 40,
    homeAboutImageUrl: 'https://picsum.photos/seed/abouthome/800/600',
    homeParallaxImageUrl: 'https://picsum.photos/seed/parallax1/1920/1080',
    homeParallaxTitle: 'Perfumes for a Life Time',
    homeParallaxSubtitle: 'We thrive for perfection, diversity, sophistication and excellence in all our products. We became creative with everything from the product itself to choosing distinctive designs for all our perfume bottles that preserve our Arabian culture and heritage.',
    homeParallaxTitleColor: '#FFFFFF',
    homeParallaxSubtitleColor: '#D1D5DB',
    aboutPageHistoryImageUrl: 'https://picsum.photos/seed/aboutpage/800/900',
    sectionTitleColor: '#FFFFFF',
    sectionSubtitleColor: '#F59E0B',
    sectionTextColor: '#D1D5DB',
    heroTitleFontSize: 'text-4xl md:text-6xl',
    heroTitleFontFamily: 'serif',
    heroSubtitleFontSize: 'text-lg md:text-xl',
    pageTitleFontSize: 'text-4xl md:text-5xl',
    sectionTitleFontSize: 'text-3xl md:text-4xl',
    sectionTitleFontFamily: 'serif',
    sectionSubtitleFontSize: 'text-sm',
    sectionTextFontSize: 'text-base',
    showAuthButtons: true,
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
