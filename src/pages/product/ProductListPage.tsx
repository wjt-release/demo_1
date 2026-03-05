import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../data/mockData';
import { ProductCard } from '../../components/product/ProductCard';

export const ProductListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  const filteredProducts = useMemo(() => {
    if (!category) return products;
    if (category === 'new') return products.filter(p => p.isNew);
    if (category === 'bestsellers') return products.filter(p => p.isBestSeller);
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }, [category]);

  const title = useMemo(() => {
    if (!category) return 'ALL PRODUCTS';
    if (category === 'new') return 'NEW ARRIVALS';
    if (category === 'bestsellers') return 'BEST SELLERS';
    return category.toUpperCase();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">{title}</h1>
        <p className="text-gray-500 max-w-2xl text-center">
          Explore our latest collection of {title.toLowerCase()}. Minimalist designs crafted for the modern woman.
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
