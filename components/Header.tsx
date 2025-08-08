import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Logo, ShoppingCartIcon, HeartIcon, MenuIcon, XIcon, UserIcon } from './icons';
import { useSettings } from '../context/SettingsContext';
import { useUserAuth } from '../context/UserAuthContext';

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSettings();
  const navigate = useNavigate();
  const { currentUser, logout } = useUserAuth();

  const linkClass = "text-gray-300 hover:text-white transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkClass = "bg-gray-700 text-white font-semibold";

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const navLinks = (
    <>
      {settings.navLinks
        .filter(link => link.enabled)
        .map(link => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              isActive ? `${activeLinkClass} ${linkClass}` : linkClass
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {link.text}
          </NavLink>
        ))}
    </>
  );

  return (
    <header className="bg-black bg-opacity-80 text-white sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/">
          <Logo />
        </NavLink>
        
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks}
        </nav>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <NavLink to="/favorites" className="relative text-gray-300 hover:text-white transition-colors duration-300" aria-label="View Favorites">
            <HeartIcon className="h-6 w-6"/>
          </NavLink>
          <NavLink to="/cart" className="relative text-gray-300 hover:text-white transition-colors duration-300" aria-label="View Shopping Cart">
            <ShoppingCartIcon className="h-6 w-6"/>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          {settings.showAuthButtons && (
            <div className="hidden sm:flex items-center">
                {currentUser ? (
                    <button onClick={handleLogout} className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-300 px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
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
              <div className="sm:hidden mt-2 pt-2 border-t border-gray-700 w-full flex flex-col items-center">
                  {currentUser ? (
                      <button onClick={handleLogout} className={`${linkClass} w-full text-center`}>
                          Logout
                      </button>
                  ) : (
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className={`${linkClass} w-full text-center`}>
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
