import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '@/components/layout';
import { ProductCard, Button } from '@/components/ui';
import { products, categories } from '@/data';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'sales';

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showFilter, setShowFilter] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'new') {
        result = result.filter(p => p.tags.includes('新品'));
      } else if (selectedCategory === 'sale') {
        result = result.filter(p => p.originalPrice);
      } else {
        result = result.filter(p => p.category === selectedCategory);
      }
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'sales':
        result.sort((a, b) => b.salesCount - a.salesCount);
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setSearchParams({ category: slug });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold mb-4">全部商品</h1>
          
          <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            共 {filteredProducts.length} 件商品
          </p>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors"
          >
            <SlidersHorizontal size={16} />
            <span>筛选排序</span>
          </button>
        </div>

        {showFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">排序方式</h3>
              <button onClick={() => setShowFilter(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'default', label: '默认排序' },
                { value: 'price-asc', label: '价格从低到高' },
                { value: 'price-desc', label: '价格从高到低' },
                { value: 'sales', label: '销量优先' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as SortOption)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    sortBy === option.value
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">暂无相关商品</p>
            <Button variant="outline" onClick={() => setSelectedCategory('all')}>
              查看全部商品
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
