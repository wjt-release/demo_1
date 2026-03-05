import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group bg-white rounded-lg overflow-hidden"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {product.isNew && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-neutral-900 text-white text-xs font-medium rounded">
              新品
            </span>
          )}
          
          {discount > 0 && !product.isNew && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-[#1e3a5f] text-white text-xs font-medium rounded">
              -{discount}%
            </span>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-neutral-600 hover:text-neutral-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Heart size={18} />
            </button>
            <button
              className="flex-1 h-10 flex items-center justify-center bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <ShoppingBag size={16} className="mr-2" />
              加入购物车
            </button>
          </div>
        </div>

        <div className="p-3 md:p-4">
          <h3 className="text-sm font-medium text-neutral-900 line-clamp-1 group-hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-semibold text-neutral-900">
              ¥{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ¥{product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.hex}
                className="w-3 h-3 rounded-full border border-neutral-200"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-neutral-400">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
