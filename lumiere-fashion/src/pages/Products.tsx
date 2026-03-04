import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { ProductGrid } from '../components/product';
import { products, categories } from '../data/products';
import { Product } from '../types';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'sales' | 'newest';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (categoryParam) {
      if (categoryParam === 'new') {
        setSelectedCategory('all');
        setSortBy('newest');
      } else if (categoryParam === 'sale') {
        setSelectedCategory('all');
      } else {
        setSelectedCategory(categoryParam);
      }
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'sales':
        result.sort((a, b) => b.sales - a.sales);
        break;
      case 'newest':
        result = result.filter(p => p.isNew);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: '默认排序' },
    { value: 'newest', label: '最新上架' },
    { value: 'sales', label: '销量最高' },
    { value: 'price-asc', label: '价格从低到高' },
    { value: 'price-desc', label: '价格从高到低' },
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-sm font-medium text-primary-black mb-4">商品分类</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryChange(category.id)}
                        className={`w-full text-left py-2 text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'text-primary-black font-medium'
                            : 'text-primary-gray hover:text-primary-black'
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    className="lg:hidden flex items-center gap-2 text-sm text-primary-gray"
                    onClick={() => setShowFilters(true)}
                  >
                    <SlidersHorizontal size={18} />
                    筛选
                  </button>
                  <span className="text-sm text-primary-gray">
                    共 {filteredProducts.length} 件商品
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 text-sm text-primary-black"
                  >
                    {sortOptions.find(o => o.value === sortBy)?.label}
                    <ChevronDown size={16} />
                  </button>

                  {showSortDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowSortDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg z-20 min-w-[160px]"
                      >
                        {sortOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-background-light ${
                              sortBy === option.value
                                ? 'text-primary-black font-medium'
                                : 'text-primary-gray'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-20">
                  <p className="text-primary-gray">暂无相关商品</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium">筛选</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">商品分类</h4>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => {
                          handleCategoryChange(category.id);
                          setShowFilters(false);
                        }}
                        className={`w-full text-left py-2 text-sm ${
                          selectedCategory === category.id
                            ? 'text-primary-black font-medium'
                            : 'text-primary-gray'
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};
