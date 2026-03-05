import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/format';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
              特惠
            </div>
          )}
          {product.tags.includes('新品') && !product.originalPrice && (
            <div className="absolute top-3 left-3 bg-[#1E3A5F] text-white text-xs px-2 py-1 rounded">
              新品
            </div>
          )}
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">已售 {product.salesCount} 件</p>
        </div>
      </Link>
    </motion.div>
  );
}
