import React from 'react';
import Link from 'next/link';
import { useFavorites } from '@/src/context/FavoritesContext';
import { useProducts } from '@/src/context/ProductContext';
import { ProductCard } from '@/src/components/ProductCard';
import { useSettings } from '@/src/context/SettingsContext';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const { products } = useProducts();
  const { settings } = useSettings();
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <div className={`container mx-auto px-6 py-12 sm:py-20 ${settings.containerWidth}`}>
      <h1 className={`${settings.pageTitleFontSize} font-bold mb-8 text-center`} style={{color: settings.textColor}}>Your Favorites</h1>
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-400 mb-8">You haven't added any favorites yet. Browse our collection to find your signature scent.</p>
          <Link 
            href="/shopping" 
            className="py-3 px-8 rounded-md font-semibold transition-colors duration-300"
            style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
          >
            Explore Perfumes
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
