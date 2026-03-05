import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, Heart } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const { product, size, color, quantity } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 py-4 border-b border-neutral-100 last:border-0"
    >
      <Link
        to={`/products/${product.id}`}
        className="flex-shrink-0 w-24 h-32 md:w-28 md:h-36 bg-neutral-100 rounded-md overflow-hidden"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <Link
              to={`/products/${product.id}`}
              className="text-sm font-medium text-neutral-900 hover:text-neutral-600 line-clamp-2"
            >
              {product.name}
            </Link>
            <p className="text-xs text-neutral-500 mt-1">
              {color} / {size}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-neutral-200 rounded-md">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 disabled:text-neutral-300 disabled:cursor-not-allowed"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 h-8 flex items-center justify-center text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-neutral-900">
              ¥{(product.price * quantity).toLocaleString()}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-neutral-400 line-through">
                ¥{(product.originalPrice * quantity).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <button className="flex items-center gap-1 mt-3 text-xs text-neutral-500 hover:text-neutral-700 transition-colors">
          <Heart size={14} />
          移入收藏夹
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
