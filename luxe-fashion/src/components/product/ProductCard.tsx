import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import type { Product } from '../../types'
import { formatPrice } from '../../utils/format'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/products/${product.id}`} className="product-card block">
        <div className="product-card-image">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="badge badge-new">新品</span>
            )}
            {discount > 0 && (
              <span className="badge badge-sale">-{discount}%</span>
            )}
            {product.sales > 500 && !product.isNew && discount === 0 && (
              <span className="badge badge-bestseller">热卖</span>
            )}
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-body font-medium line-clamp-2 mb-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={clsx(
              'text-body font-medium',
              product.originalPrice && 'text-error'
            )}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-small text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.sales > 0 && (
            <p className="text-small text-gray-500 mt-1">
              已售 {product.sales > 999 ? '999+' : product.sales} 件
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
