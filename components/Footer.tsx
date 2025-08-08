

import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, FacebookIcon, InstagramIcon, YouTubeIcon } from './icons';
import { useSettings } from '../context/SettingsContext';

export const Footer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Logo and About */}
          <div>
            <div className="flex justify-center md:justify-start mb-4">
                <Logo textClassName="text-xl" iconSize={26} />
            </div>
            <p className="text-sm text-gray-500 max-w-sm mx-auto md:mx-0">
                Yasir perfumes is a group of one of the leading industrial perfumes dealer in Kerala. We are Wholesalers, Retailers and manufacturing company of Oud Athar Bakhoor & Scent items.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 tracking-wider">Quick Links</h3>
            <div className="flex flex-col space-y-2 text-sm">
                <Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link>
                <Link to="/services" className="hover:text-white transition-colors duration-300">Services</Link>
                <Link to="/shopping" className="hover:text-white transition-colors duration-300">Shop</Link>
                <Link to="/favorites" className="hover:text-white transition-colors duration-300">Favorites</Link>
            </div>
          </div>
          
          {/* Social and Contact */}
          <div>
             <h3 className="font-semibold text-white mb-4 tracking-wider">Follow Us</h3>
             <div className="flex space-x-6 justify-center md:justify-start">
                {settings.facebook && (
                    <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FacebookIcon className="h-6 w-6" />
                    </a>
                )}
                {settings.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <InstagramIcon className="h-6 w-6" />
                    </a>
                )}
                {settings.youtube && (
                    <a href={settings.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <YouTubeIcon className="h-6 w-6" />
                    </a>
                )}
              </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-12 border-t border-gray-800 pt-8">
            <div className="flex justify-center space-x-6 mb-4">
                <Link to="/terms-conditions" className="text-xs hover:text-white transition-colors duration-300">Terms & Conditions</Link>
                <Link to="/privacy-policy" className="text-xs hover:text-white transition-colors duration-300">Privacy & Policies</Link>
                <Link to="/refund-cancellation" className="text-xs hover:text-white transition-colors duration-300">Refund & Cancellation</Link>
            </div>
            <p className="text-sm text-gray-500">Yasir perfumes © {new Date().getFullYear()} All Right Reserved.</p>
            <p className="text-xs text-gray-600 mt-1">Made with love by Magnus Technologies</p>
            <Link to="/admin" className="text-xs text-gray-700 hover:text-gray-300 transition-colors mt-2 inline-block">Admin</Link>
        </div>
      </div>
    </footer>
  );
};
