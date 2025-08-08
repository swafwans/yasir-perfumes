
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { ShoppingCartIcon, HeartIcon } from './icons';
import { useSettings } from '../context/SettingsContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { settings } = useSettings();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const favoriteStatus = isFavorite(product.id);
  
  const cardClasses = [
    'group',
    'block',
    'overflow-hidden',
    'transition-shadow duration-300',
    'flex flex-col',
    settings.cardShadow ? 'shadow-lg hover:shadow-amber-500/20' : '',
    settings.cardOutline ? 'border-2' : 'border',
  ].join(' ');

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={cardClasses}
      style={{
        backgroundColor: settings.cardBackgroundColor,
        borderColor: settings.cardOutline ? settings.primaryColor : '#374151', // gray-700
        borderRadius: `${settings.cardBorderRadius}px`,
      }}
    >
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className={`w-full ${settings.cardImageHeight} object-cover group-hover:scale-105 transition-transform duration-300`} />
        <button 
          onClick={handleToggleFavorite} 
          className="absolute top-3 right-3 p-2 bg-black bg-opacity-50 rounded-full text-white hover:text-amber-500 transition-colors duration-300"
          aria-label={favoriteStatus ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon className="h-6 w-6" isFilled={favoriteStatus} />
        </button>
      </div>
      <div 
        className="flex flex-col flex-grow"
        style={{ padding: `${settings.cardPadding}rem` }}
      >
        <h3 className={`truncate ${settings.cardTitleFontSize} ${settings.cardTitleFontWeight}`} style={{color: settings.textColor}}>{product.name}</h3>
        <p className={`text-gray-400 mt-1 ${settings.cardPriceFontSize}`}>₹{product.price.toLocaleString('en-IN')}</p>
        <button 
          onClick={handleAddToCart} 
          className="w-full mt-auto pt-4 flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-300"
          style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          {settings.cardButtonText}
        </button>
      </div>
    </Link>
  );
};
