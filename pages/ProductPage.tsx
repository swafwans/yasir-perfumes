
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { PlusIcon, MinusIcon } from '../components/icons';
import { useSettings } from '../context/SettingsContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { getProductById } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const { settings } = useSettings();

  const product = getProductById(parseInt(id || '', 10));

  if (!product) {
    return <div className="container mx-auto px-6 py-20 text-center">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} x ${product.name} added to cart!`);
  };

  return (
    <div className={`container mx-auto px-6 py-12 sm:py-20 ${settings.containerWidth}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover" />
        </div>
        
        <div style={{color: settings.textColor}}>
          <h1 className="text-4xl font-bold" style={{fontFamily: 'serif'}}>{product.name}</h1>
          <p className="text-3xl my-4" style={{color: settings.primaryColor}}>₹{product.price.toLocaleString('en-IN')}</p>
          <p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>
          
          <div className="mb-8 border-t border-gray-700 pt-6">
            <h3 className="text-xl font-semibold mb-3">Scent Notes</h3>
            <ul className="space-y-2 text-gray-400">
              <li><strong>Top:</strong> {product.notes.top}</li>
              <li><strong>Middle:</strong> {product.notes.middle}</li>
              <li><strong>Base:</strong> {product.notes.base}</li>
            </ul>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <p className="font-semibold">Quantity:</p>
            <div className="flex items-center border border-gray-600 rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-gray-300 hover:bg-gray-700 transition-colors" aria-label="Decrease quantity">
                <MinusIcon className="h-5 w-5" />
              </button>
              <span className="px-4 text-lg font-semibold" aria-live="polite">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-gray-300 hover:bg-gray-700 transition-colors" aria-label="Increase quantity">
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full sm:w-auto py-3 px-12 rounded-md text-lg font-semibold transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
