import React, { useState } from 'react';
import { ProductList } from '../components/product/ProductList';
import { products } from '../mock/data';

export const ProductListing = () => {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  const categories = ['All', 'Outerwear', 'Dresses', 'Tops', 'Bottoms', 'Knitwear', 'Shoes'];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase mb-8">Shop</h1>

        {/* Filters */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide whitespace-nowrap transition-colors ${
                filter === cat.toLowerCase()
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};
