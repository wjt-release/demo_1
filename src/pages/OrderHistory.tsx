import React from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const OrderHistory: React.FC = () => {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">PLEASE LOG IN</h2>
        <Link to="/login" className="text-sm underline hover:text-gray-600">
          SIGN IN TO VIEW ORDERS
        </Link>
      </div>
    );
  }

  if (user.orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">NO ORDERS YET</h2>
        <Link to="/shop" className="text-sm underline hover:text-gray-600">
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">ORDER HISTORY</h1>
      
      <div className="space-y-6">
        {user.orders.map((order) => (
          <div key={order.id} className="border border-gray-200 p-6 rounded-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">¥{order.total}</p>
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full mt-1">
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-600">
                  <span className="w-8 h-8 bg-gray-100 mr-3 overflow-hidden flex-shrink-0">
                    <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                  </span>
                  <span className="flex-grow">{item.product.name}</span>
                  <span className="text-gray-400">Size: {item.size}</span>
                  <span className="ml-4">x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
