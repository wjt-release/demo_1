import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">YOUR CART IS EMPTY</h2>
        <Link to="/shop" className="text-sm underline hover:text-gray-600">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">SHOPPING CART</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-grow space-y-8">
          {cart.map((item) => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-6 py-6 border-b border-gray-100">
              <Link to={`/product/${item.product.id}`} className="w-24 h-32 bg-gray-100 flex-shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <Link to={`/product/${item.product.id}`} className="font-medium hover:underline">
                      {item.product.name}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">¥{item.product.price}</p>
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center border border-gray-300">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-medium">¥{item.product.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-gray-50 p-8">
            <h3 className="text-lg font-bold mb-6">ORDER SUMMARY</h3>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">¥{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-6 mb-8">
              <span>Total</span>
              <span>¥{subtotal}</span>
            </div>
            <Link 
              to="/checkout" 
              className="block w-full bg-black text-white text-center py-4 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors"
            >
              CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
