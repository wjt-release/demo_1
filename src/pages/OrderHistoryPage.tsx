import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

interface Order {
  id: string;
  items: any[];
  total: number;
  date: string;
  status: string;
}

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('aura-orders') || '[]');
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-6">订单记录</h1>
        <p className="text-gray-500 mb-10">您还没有任何订单。</p>
        <Link to="/products">
          <Button variant="primary" size="lg" className="px-10">
            开始购物
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold uppercase tracking-wider mb-10 text-center">我的订单</h1>
      
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
              <div>
                <span className="text-sm text-gray-500">订单号:</span>
                <span className="ml-2 font-medium text-gray-900">#{order.id}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">下单日期:</span>
                <span className="ml-2 font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">状态:</span>
                <span className="ml-2 font-medium text-green-600">{order.status}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={`${item.productId}-${item.size}`} className="flex items-center">
                  <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500">尺码: {item.size} x {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ¥ {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end border-t border-gray-100 pt-4">
              <span className="text-lg font-bold text-gray-900">总计: ¥ {order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
