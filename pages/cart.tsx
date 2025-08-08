import React from 'react';
import Link from 'next/link';
import { useCart } from '@/src/context/CartContext';
import { PlusIcon, MinusIcon, TrashIcon } from '@/src/components/icons';
import { useSettings } from '@/src/context/SettingsContext';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { settings } = useSettings();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className={`container mx-auto px-6 py-20 text-center ${settings.containerWidth}`}>
        <h1 className={`${settings.pageTitleFontSize} font-bold mb-4`} style={{color: settings.textColor}}>Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven't added any fragrances yet.</p>
        <Link 
            href="/shopping" 
            className="py-3 px-8 rounded-md font-semibold transition-colors duration-300"
            style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-6 py-12 sm:py-20 ${settings.containerWidth}`}>
      <h1 className={`${settings.pageTitleFontSize} font-bold mb-8`} style={{color: settings.textColor}}>Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-lg shadow-lg" style={{backgroundColor: settings.cardBackgroundColor}}>
          <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
             <h2 className="text-xl font-semibold" style={{color: settings.textColor}}>Your Items</h2>
             <button onClick={clearCart} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Clear Cart</button>
          </div>
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <div>
                    <h3 className="font-semibold" style={{color: settings.textColor}}>{item.name}</h3>
                    <p className="text-gray-400">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-600 rounded-md">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-300 hover:bg-gray-700 transition-colors" aria-label={`Decrease quantity of ${item.name}`}>
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <span className="px-3 font-semibold" aria-live="polite">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-300 hover:bg-gray-700 transition-colors" aria-label={`Increase quantity of ${item.name}`}>
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label={`Remove ${item.name} from cart`}>
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 rounded-lg shadow-lg h-fit" style={{backgroundColor: settings.cardBackgroundColor}}>
          <h2 className="text-xl font-semibold border-b border-gray-700 pb-4 mb-4" style={{color: settings.textColor}}>Order Summary</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-2 mt-2" style={{color: settings.textColor}}>
              <span>Total</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <Link 
            href="/checkout" 
            className="block w-full text-center py-3 px-4 rounded-md font-semibold transition-colors duration-300"
            style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
