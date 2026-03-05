import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useFavoritesStore } from '@/store/favoritesStore';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1">
              新品
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-3 right-3 bg-status-error text-white text-xs px-2 py-1">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className="absolute bottom-3 right-3 p-2 bg-white/80 hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite(product.id)
                  ? 'fill-status-error text-status-error'
                  : 'text-gray-400 hover:text-status-error'
              }`}
            />
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-primary line-clamp-2 group-hover:underline">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-base font-medium text-primary">
              ¥{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ¥{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  linkTo?: string;
}

export function ProductSection({ title, products, linkTo }: ProductSectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-primary">
            {title}
          </h2>
          {linkTo && (
            <Link
              to={linkTo}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              查看更多
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
