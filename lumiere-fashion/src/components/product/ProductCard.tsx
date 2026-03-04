import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-background-light">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-primary-black text-white text-xs px-2 py-1">
              新品
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-accent-navy text-white text-xs px-2 py-1">
              -{discount}%
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-sm text-primary-black line-clamp-2 group-hover:text-primary-gray transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-primary-black">
              ¥{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-primary-gray line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
