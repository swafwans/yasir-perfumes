import React from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/src/context/CartContext';
import { useSettings } from '@/src/context/SettingsContext';

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const { settings } = useSettings();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      router.push('/shopping');
      return;
    }
    alert("Thank you for your order! It will be shipped soon (Cash on Delivery).");
    clearCart();
    router.push('/');
  };

  return (
    <div className={`container mx-auto px-6 py-12 sm:py-20 ${settings.containerWidth}`}>
      <h1 className={`${settings.pageTitleFontSize} font-bold mb-8 text-center`} style={{color: settings.textColor}}>Checkout</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form id="checkout-form" onSubmit={handleSubmit} className="p-8 rounded-lg shadow-lg" style={{backgroundColor: settings.cardBackgroundColor}}>
          <h2 className="text-2xl font-semibold mb-6" style={{color: settings.textColor}}>Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input type="text" id="name" required className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Address</label>
              <input type="text" id="address" required className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500" />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">City</label>
              <input type="text" id="city" required className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input type="email" id="email" required className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500" />
            </div>
            <div className="border-t border-gray-700 pt-4 mt-4">
              <h3 className="text-xl font-semibold mb-2" style={{color: settings.textColor}}>Payment Method</h3>
              <div className="bg-gray-800 p-4 rounded-md" style={{borderColor: settings.primaryColor, borderWidth: 1}}>
                <p className="font-semibold" style={{color: settings.textColor}}>Cash on Delivery</p>
                <p className="text-sm text-gray-400">Pay with cash upon receiving your order.</p>
              </div>
            </div>
          </div>
        </form>

        <div className="p-8 rounded-lg shadow-lg h-fit" style={{backgroundColor: settings.cardBackgroundColor}}>
          <h2 className="text-2xl font-semibold mb-6" style={{color: settings.textColor}}>Your Order</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-gray-300">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded mr-3"/>
                  <span>{item.name} <span className="text-gray-500">x {item.quantity}</span></span>
                </div>
                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-4 space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2" style={{color: settings.textColor}}>
              <span>Total</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
           <button 
            type="submit" 
            form="checkout-form" 
            className="w-full mt-8 py-3 px-4 rounded-md font-semibold transition-colors duration-300"
            style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
           >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
