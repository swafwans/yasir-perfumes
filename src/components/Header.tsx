
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/src/context/CartContext';
import { Logo, ShoppingCartIcon, HeartIcon, MenuIcon, XIcon, UserIcon } from './icons';
import { useSettings } from '@/src/context/SettingsContext';
import { useUserAuth } from '@/src/context/UserAuthContext';

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSettings();
  const router = useRouter();
  const { currentUser, logout } = useUserAuth();

  const linkClass = "text-gray-300 hover:text-white transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkClass = "bg-gray-700 text-white font-semibold";

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks = (
    <>
      {settings.navLinks
        .filter(link => link.enabled)
        .map(link => (
          <Link
            key={link.id}
            href={link.path}
            className={
              router.pathname === link.path
                ? `${activeLinkClass} ${linkClass}`
                : linkClass
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {link.text}
          </Link>
        ))}
    </>
  );

  return (
    <header className="bg-black bg-opacity-80 text-white sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks}
        </nav>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link href="/favorites" className="relative text-gray-300 hover:text-white transition-colors duration-300" aria-label="View Favorites">
            <HeartIcon className="h-6 w-6"/>
          </Link>
          <Link href="/cart" className="relative text-gray-300 hover:text-white transition-colors duration-300" aria-label="View Shopping Cart">
            <ShoppingCartIcon className="h-6 w-6"/>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {settings.showAuthButtons && (
            <div className="hidden sm:flex items-center">
                {currentUser ? (
                    <button onClick={handleLogout} className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
                        Logout
                    </button>
                ) : (
                    <Link href="/login" className="bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-300 px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
                      <UserIcon className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                )}
            </div>
          )}

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white" aria-expanded={isMenuOpen} aria-controls="mobile-menu">
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90" id="mobile-menu">
          <nav className="flex flex-col items-center space-y-2 py-4">
            {navLinks}
             {settings.showAuthButtons && (
                <div className="sm:hidden mt-2">
                    {currentUser ? (
                        <button onClick={handleLogout} className={`${linkClass} w-full text-center`}>
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className={`${linkClass} w-full text-center`}>
                            Login
                        </Link>
                    )}
                </div>
              )}
          </nav>
        </div>
      )}
    </header>
  );
};
