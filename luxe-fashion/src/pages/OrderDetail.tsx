import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Package, 
  MapPin, 
  CreditCard, 
  ChevronLeft,
  CheckCircle,
  Truck,
  Clock,
} from 'lucide-react'
import { useAuthStore } from '../stores/useAuthStore'
import { useOrderStore } from '../stores/useOrderStore'
import { Button } from '../components/common/Button'
import { formatPrice, formatDateTime, formatOrderStatus, formatPaymentStatus } from '../utils/format'

export function OrderDetail() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuthStore()
  const { getOrderById } = useOrderStore()

  const order = id ? getOrderById(id) : null

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-h2 mb-2">请先登录</h2>
        <Link to="/login">
          <Button variant="primary">去登录</Button>
        </Link>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-h2 mb-2">订单不存在</h2>
        <Link to="/orders">
          <Button variant="primary">返回订单列表</Button>
        </Link>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6" />
      case 'paid':
        return <CheckCircle className="w-6 h-6" />
      case 'shipped':
        return <Truck className="w-6 h-6" />
      case 'delivered':
        return <Package className="w-6 h-6" />
      default:
        return <Package className="w-6 h-6" />
    }
  }

  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: '待付款', time: order.status === 'pending' ? order.createdAt : '' },
      { key: 'paid', label: '待发货', time: order.status !== 'pending' ? order.updatedAt : '' },
      { key: 'shipped', label: '待收货', time: '' },
      { key: 'delivered', label: '已完成', time: '' },
    ]

    const statusOrder = ['pending', 'paid', 'shipped', 'delivered']
    const currentIndex = statusOrder.indexOf(order.status)

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex && order.status !== 'cancelled',
      active: step.key === order.status,
    }))
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="container-custom py-8">
        <Link
          to="/orders"
          className="flex items-center gap-2 text-body text-gray-600 hover:text-black mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          返回订单列表
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  order.status === 'cancelled' ? 'bg-gray-100 text-gray-600' :
                  order.status === 'delivered' ? 'bg-green-100 text-success' :
                  'bg-black text-white'
                }`}>
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <h2 className="text-h2 font-medium">
                    {formatOrderStatus(order.status)}
                  </h2>
                  <p className="text-body text-gray-600">
                    订单号：{order.id}
                  </p>
                </div>
              </div>

              {order.status !== 'cancelled' && (
                <div className="flex items-center justify-between">
                  {getStatusSteps().map((step, index) => (
                    <div key={step.key} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-small ${
                            step.completed
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span
                          className={`text-small mt-2 ${
                            step.active ? 'text-black font-medium' : 'text-gray-500'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < 3 && (
                        <div
                          className={`w-16 md:w-24 h-0.5 mx-2 ${
                            step.completed ? 'bg-black' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 p-6"
            >
              <h3 className="text-h3 font-medium flex items-center gap-2 mb-4">
                <Package className="w-5 h-5" />
                商品信息
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-20 h-24 object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/products/${item.productId}`}
                        className="text-body font-medium hover:text-gray-600 line-clamp-2"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-small text-gray-500 mt-1">
                        {item.color} / {item.size}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-body">{formatPrice(item.price)}</span>
                        <span className="text-body text-gray-600">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 p-6"
            >
              <h3 className="text-h3 font-medium flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5" />
                收货信息
              </h3>
              <div className="text-body">
                <p className="font-medium">{order.address.recipient} {order.address.phone}</p>
                <p className="text-gray-600 mt-1">
                  {order.address.province} {order.address.city} {order.address.district} {order.address.detail}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24 bg-white border border-gray-200 p-6"
            >
              <h3 className="text-h3 font-medium flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5" />
                订单信息
              </h3>
              <div className="space-y-3 text-body">
                <div className="flex justify-between">
                  <span className="text-gray-600">订单编号</span>
                  <span>{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">下单时间</span>
                  <span>{formatDateTime(order.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">支付状态</span>
                  <span className={order.paymentStatus === 'paid' ? 'text-success' : 'text-yellow-600'}>
                    {formatPaymentStatus(order.paymentStatus)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-body">
                  <span className="text-gray-600">商品总额</span>
                  <span>{formatPrice(order.totalAmount)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-body">
                    <span className="text-gray-600">优惠金额</span>
                    <span className="text-error">-{formatPrice(order.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-body">
                  <span className="text-gray-600">运费</span>
                  <span className="text-success">免运费</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-body font-medium">实付金额</span>
                  <span className="text-xl font-medium">{formatPrice(order.finalAmount)}</span>
                </div>
              </div>

              {order.status === 'pending' && (
                <Button variant="primary" fullWidth className="mt-6">
                  立即支付
                </Button>
              )}

              {order.status === 'shipped' && (
                <Button variant="primary" fullWidth className="mt-6">
                  确认收货
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
