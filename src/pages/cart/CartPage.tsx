import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../../components/ui/Button';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-3xl font-bold">YOUR BAG IS EMPTY</h1>
        <p className="text-gray-500">Looks like you haven't added anything to your bag yet.</p>
        <Link to="/products">
          <Button>START SHOPPING</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 tracking-tighter">SHOPPING BAG ({items.length})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 border-b border-gray-100 pb-8">
              <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold uppercase text-sm tracking-wide">{item.name}</h3>
                  <button 
                    onClick={() => removeItem(item.id, item.selectedSize)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                <p className="font-medium">¥{item.price}</p>
                
                <div className="flex items-center space-x-4 pt-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={clearCart}
            className="text-sm text-red-500 hover:underline font-medium"
          >
            CLEAR CART
          </button>
        </div>

        <div className="bg-gray-50 p-8 h-fit">
          <h2 className="text-xl font-bold mb-6 tracking-wide">ORDER SUMMARY</h2>
          <div className="space-y-4 text-sm mb-8 border-b border-gray-200 pb-8">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">¥{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-4">
              <span>Total</span>
              <span>¥{total}</span>
            </div>
          </div>
          <Button fullWidth size="lg" onClick={() => navigate('/checkout')}>
            CHECKOUT
          </Button>
          <div className="mt-4 text-xs text-gray-400 text-center">
            <p>Secure Checkout - SSL Encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};
