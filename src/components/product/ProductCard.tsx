import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {product.newArrival && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 uppercase tracking-wider">
            New
          </span>
        )}
        {product.bestSeller && !product.newArrival && (
          <span className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 uppercase tracking-wider border border-black">
            Best Seller
          </span>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 font-medium group-hover:text-black transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">¥{product.price}</p>
      </div>
    </Link>
  );
};
