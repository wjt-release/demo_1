import React from 'react';
import { useUserStore } from '../store/useStore';
import { Button } from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, orders, logout } = useUserStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900">My Account</h1>
        <Button variant="secondary" onClick={handleLogout}>Sign Out</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-zinc-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium uppercase tracking-wide mb-4">Profile Info</h3>
            <p className="text-sm text-gray-500 mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="text-sm text-gray-500"><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-medium uppercase tracking-wide mb-6">Order History</h3>
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-zinc-50 rounded-lg">
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <Link to="/shop">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                  <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                      <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase tracking-wide">
                      {order.status}
                    </span>
                  </div>
                  <div className="px-6 py-4">
                    <ul className="divide-y divide-zinc-100">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded mr-4 bg-zinc-100" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.color} / {item.size} x {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-900">CNY {item.price * item.quantity}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-zinc-100 mt-4 pt-4 flex justify-between items-center">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-lg font-bold text-gray-900">CNY {order.total}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
