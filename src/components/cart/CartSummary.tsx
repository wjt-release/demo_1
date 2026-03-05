import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import type { CartItem } from '@/types';

interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

const CartSummary = ({ items, totalPrice, totalItems }: CartSummaryProps) => {
  const discount = items.reduce((acc, item) => {
    if (item.product.originalPrice) {
      return acc + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return acc;
  }, 0);

  const shipping = totalPrice >= 299 ? 0 : 15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-50 rounded-lg p-6"
    >
      <h3 className="text-base font-medium text-neutral-900 mb-4">订单摘要</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">
            商品小计 ({totalItems}件)
          </span>
          <span className="text-neutral-900">
            ¥{totalPrice.toLocaleString()}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span>优惠折扣</span>
            <span>-¥{discount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-neutral-600">运费</span>
          <span className={shipping === 0 ? 'text-green-600' : 'text-neutral-900'}>
            {shipping === 0 ? '免运费' : `¥${shipping}`}
          </span>
        </div>

        {totalPrice < 299 && (
          <p className="text-xs text-neutral-500 pt-1">
            再购 ¥{(299 - totalPrice).toLocaleString()} 即可享受免运费
          </p>
        )}

        <div className="pt-3 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <span className="text-neutral-900 font-medium">合计</span>
            <span className="text-xl font-semibold text-neutral-900">
              ¥{(totalPrice + shipping).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <Link to="/checkout" className="block mt-6">
        <Button fullWidth size="lg">
          <ShoppingBag size={18} className="mr-2" />
          去结算
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </Link>

      <p className="text-xs text-neutral-500 text-center mt-4">
        支持多种支付方式，订单满299元免运费
      </p>
    </motion.div>
  );
};

export default CartSummary;
