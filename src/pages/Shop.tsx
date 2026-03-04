import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const sort = searchParams.get('sort');
    if (sort === 'best') {
      setSortBy('best-sellers');
    }
  }, [searchParams]);

  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'best-sellers') {
      result = result.filter(p => p.bestSeller);
    }
    // Default or 'newest' keeps original order
    
    return result;
  }, [category, sortBy]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">SHOP</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-6 hide-scrollbar">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                category === c ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500 hover:text-black'
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-500">Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="best-sellers">Best Sellers</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
};
