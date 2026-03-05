import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout';
import { ProductCard, ProductFilter } from '@/components/product';
import { EmptyState } from '@/components/common';
import { products } from '@/data';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: 'all',
    size: 'all',
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category === 'new') {
      result = result.filter((p) => p.isNew);
    } else if (filters.category === 'hot') {
      result = result.filter((p) => p.isHot);
    } else if (filters.category !== 'all') {
      const categoryMap: Record<string, string> = {
        jacket: '外套',
        dress: '连衣裙',
        top: '上衣',
        pants: '裤装',
        skirt: '裙装',
        accessory: '配饰',
      };
      result = result.filter((p) => p.category === categoryMap[filters.category]);
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map((v) => {
        if (v.includes('+')) return Infinity;
        return parseInt(v);
      });
      result = result.filter((p) => {
        if (max === undefined) return p.price >= min;
        return p.price >= min && p.price <= max;
      });
    }

    if (filters.size !== 'all') {
      result = result.filter((p) => p.sizes.includes(filters.size));
    }

    return result;
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === 'category') {
      setSearchParams(value === 'all' ? {} : { category: value });
    }
  };

  const clearFilters = () => {
    setFilters({ category: 'all', priceRange: 'all', size: 'all' });
    setSearchParams({});
  };

  const getTitle = () => {
    if (filters.category === 'new') return '新品上市';
    if (filters.category === 'hot') return '热销推荐';
    if (filters.category === 'all') return '全部商品';
    
    const categoryMap: Record<string, string> = {
      jacket: '外套',
      dress: '连衣裙',
      top: '上衣',
      pants: '裤装',
      skirt: '裙装',
      accessory: '配饰',
    };
    return categoryMap[filters.category] || '全部商品';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">
              {getTitle()}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              共 {filteredProducts.length} 件商品
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          <ProductFilter
            selectedCategory={filters.category}
            selectedPriceRange={filters.priceRange}
            selectedSize={filters.size}
            onCategoryChange={(value) => handleFilterChange('category', value)}
            onPriceRangeChange={(value) => handleFilterChange('priceRange', value)}
            onSizeChange={(value) => handleFilterChange('size', value)}
            onClearFilters={clearFilters}
          />

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="暂无商品"
                description="没有找到符合条件的商品，请尝试其他筛选条件"
                action={
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-neutral-900 text-white text-sm rounded-md hover:bg-neutral-800 transition-colors"
                  >
                    清除筛选
                  </button>
                }
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
