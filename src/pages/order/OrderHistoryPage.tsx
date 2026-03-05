import React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { Button } from '../../components/ui/Button';

export const OrderHistoryPage: React.FC = () => {
  const { user, orders } = useUserStore();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-4">PLEASE LOG IN</h1>
        <Link to="/login">
          <Button>LOGIN</Button>
        </Link>
      </div>
    );
  }

  const userOrders = orders.filter(order => order.userId === user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 tracking-tighter">ORDER HISTORY</h1>

      {userOrders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">You haven't placed any orders yet.</p>
          <Link to="/products" className="mt-4 inline-block">
            <Button>START SHOPPING</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {userOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 p-6 rounded-lg bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-bold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">¥{order.total}</p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded uppercase">
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-500">Size: {item.selectedSize} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
