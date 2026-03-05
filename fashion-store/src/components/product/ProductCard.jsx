import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const ProductCard = ({ product }) => {
  return (
    <div className="group relative block overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase tracking-widest px-2 py-1">
            New
          </span>
        )}
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Heart size={16} className="text-black" />
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-zinc-700 uppercase tracking-wide">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-zinc-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-black">
          {product.currency} {product.price}
        </p>
      </div>
    </div>
  );
};
