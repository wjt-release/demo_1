import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '../stores/useCartStore'
import { useAuthStore } from '../stores/useAuthStore'
import { Button } from '../components/common/Button'
import { formatPrice } from '../utils/format'

export function Cart() {
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-h2 mb-2">购物车是空的</h2>
        <p className="text-body text-gray-600 mb-6">快去挑选心仪的商品吧</p>
        <Link to="/products">
          <Button variant="primary">去购物</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-h1 font-display">购物车</h1>
          <button
            onClick={clearCart}
            className="text-body text-gray-600 hover:text-error transition-colors"
          >
            清空购物车
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 py-6 border-b border-gray-200"
                >
                  <Link
                    to={`/products/${item.productId}`}
                    className="flex-shrink-0 w-24 h-32 bg-gray-100"
                  >
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.productId}`}
                      className="text-body font-medium hover:text-gray-600 transition-colors line-clamp-2"
                    >
                      {item.productName}
                    </Link>
                    <p className="text-small text-gray-500 mt-1">
                      {item.color} / {item.size}
                    </p>
                    <p className="text-body font-medium mt-2">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-body min-w-[48px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-error transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-body font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 p-6">
              <h3 className="text-h3 font-medium mb-4">订单摘要</h3>
              <div className="space-y-3 text-body">
                <div className="flex justify-between">
                  <span className="text-gray-600">商品小计</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">运费</span>
                  <span className="text-success">免运费</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">优惠</span>
                  <span>- {formatPrice(0)}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-body font-medium">合计</span>
                  <span className="text-xl font-medium">{formatPrice(getTotal())}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Button variant="primary" fullWidth onClick={handleCheckout}>
                  去结算
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link to="/products">
                  <Button variant="outline" fullWidth>
                    继续购物
                  </Button>
                </Link>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="输入优惠码"
                    className="flex-1 input-field text-body"
                  />
                  <Button variant="outline" size="sm">
                    使用
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
