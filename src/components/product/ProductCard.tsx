import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-bold uppercase tracking-wider">
            New
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium uppercase tracking-wide group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center space-x-2 text-sm">
          <span className={product.originalPrice ? 'text-red-500 font-medium' : 'text-gray-900'}>
            ¥{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-xs">
              ¥{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
