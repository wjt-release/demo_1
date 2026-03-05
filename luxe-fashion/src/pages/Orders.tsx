import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ChevronRight } from 'lucide-react'
import { useAuthStore } from '../stores/useAuthStore'
import { useOrderStore } from '../stores/useOrderStore'
import { Button } from '../components/common/Button'
import { formatPrice, formatDate, formatOrderStatus } from '../utils/format'

export function Orders() {
  const { user, isAuthenticated } = useAuthStore()
  const { getOrdersByUser } = useOrderStore()

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-h2 mb-2">请先登录</h2>
        <p className="text-body text-gray-600 mb-6">登录后查看您的订单</p>
        <Link to="/login">
          <Button variant="primary">去登录</Button>
        </Link>
      </div>
    )
  }

  const orders = getOrdersByUser(user.id)

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-h2 mb-2">暂无订单</h2>
        <p className="text-body text-gray-600 mb-6">快去挑选心仪的商品吧</p>
        <Link to="/products">
          <Button variant="primary">去购物</Button>
        </Link>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'paid':
        return 'text-blue-600 bg-blue-50'
      case 'shipped':
        return 'text-purple-600 bg-purple-50'
      case 'delivered':
        return 'text-success bg-green-50'
      case 'cancelled':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="container-custom py-8">
        <h1 className="text-h1 font-display mb-8">我的订单</h1>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-6">
                  <span className="text-small text-gray-500">
                    订单号：{order.id}
                  </span>
                  <span className="text-small text-gray-500">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                <span
                  className={`text-small px-2 py-1 ${getStatusColor(order.status)}`}
                >
                  {formatOrderStatus(order.status)}
                </span>
              </div>

              <div className="p-6">
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex-shrink-0 flex gap-3">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-20 h-24 object-cover bg-gray-100"
                      />
                      <div className="w-40">
                        <p className="text-body line-clamp-2">{item.productName}</p>
                        <p className="text-small text-gray-500 mt-1">
                          {item.color} / {item.size}
                        </p>
                        <p className="text-small text-gray-500">
                          x{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-body text-gray-600">共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品</span>
                    <span className="mx-4 text-gray-300">|</span>
                    <span className="text-body">
                      实付：<span className="font-medium">{formatPrice(order.finalAmount)}</span>
                    </span>
                  </div>
                  <Link to={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      查看详情
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
