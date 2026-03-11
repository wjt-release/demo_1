import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { ProductCard } from '@/components/home';
import { Button } from '@/components/common';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Category } from '@/types';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'newest';

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort') as SortOption || 'default';
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  const sizeParam = searchParams.get('size');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryParam === 'new') {
      result = result.filter(p => p.isNew);
    } else if (categoryParam === 'hot') {
      result = result.filter(p => p.isHot);
    } else if (categoryParam) {
      result = result.filter(p => p.categoryId === categoryParam);
    }

    if (priceMin) {
      result = result.filter(p => p.price >= parseInt(priceMin));
    }
    if (priceMax) {
      result = result.filter(p => p.price <= parseInt(priceMax));
    }

    if (sizeParam) {
      result = result.filter(p => p.sizes.includes(sizeParam));
    }

    switch (sortParam) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return result;
  }, [categoryParam, sortParam, priceMin, priceMax, sizeParam]);

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const getCategoryName = () => {
    if (categoryParam === 'new') return '新品上市';
    if (categoryParam === 'hot') return '热销推荐';
    const category = categories.find(c => c.id === categoryParam);
    return category?.name || '全部商品';
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-medium text-primary">
                {getCategoryName()}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                共 {filteredProducts.length} 件商品
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-primary transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden md:inline">筛选</span>
            </button>
          </div>

          <div className="flex gap-8">
            <motion.aside
              initial={false}
              animate={{ width: showFilters ? 'auto' : 0 }}
              className="overflow-hidden md:w-64 flex-shrink-0"
              style={{ width: showFilters ? '16rem' : 0 }}
            >
              <div className="w-64 pr-4">
                <div className="sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium">筛选条件</h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-500 hover:text-primary"
                    >
                      清除全部
                    </button>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-sm mb-3">分类</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => updateFilter('category', null)}
                        className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                          !categoryParam ? 'bg-primary text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        全部商品
                      </button>
                      {categories.map((category: Category) => (
                        <button
                          key={category.id}
                          onClick={() => updateFilter('category', category.id)}
                          className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                            categoryParam === category.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-sm mb-3">价格区间</h4>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="最低"
                        value={priceMin || ''}
                        onChange={(e) => updateFilter('priceMin', e.target.value || null)}
                        className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-primary"
                      />
                      <span className="text-gray-400 self-center">-</span>
                      <input
                        type="number"
                        placeholder="最高"
                        value={priceMax || ''}
                        onChange={(e) => updateFilter('priceMax', e.target.value || null)}
                        className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-sm mb-3">尺码</h4>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => updateFilter('size', sizeParam === size ? null : size)}
                          className={`px-3 py-1 text-sm border transition-colors ${
                            sizeParam === size
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            <div className="flex-1">
              <div className="flex items-center justify-end gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">排序：</span>
                  <select
                    value={sortParam}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="default">默认</option>
                    <option value="price-asc">价格从低到高</option>
                    <option value="price-desc">价格从高到低</option>
                    <option value="newest">最新上架</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 mb-4">没有找到符合条件的商品</p>
                  <Button variant="outline" onClick={clearFilters}>
                    清除筛选
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
