import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { Filter, ChevronDown } from 'lucide-react';

export const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'newest'>('newest');
  const [activeFilter, setActiveFilter] = useState<string | null>(categoryParam);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeFilter && activeFilter !== 'all') {
      result = result.filter(p => {
        if (activeFilter === 'new') return p.isNew;
        if (activeFilter === 'sale') return p.originalPrice;
        return p.category === activeFilter;
      });
    }

    if (sortOrder === 'asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else {
      result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [activeFilter, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold uppercase tracking-wider">全部商品</h1>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Filter */}
          <div className="relative group">
            <button className="flex items-center space-x-2 text-sm font-medium border border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-between">
              <span>{activeFilter ? activeFilter : '筛选'}</span>
              <Filter size={16} />
            </button>
            <div className="absolute top-full left-0 w-48 bg-white shadow-lg border border-gray-100 mt-2 z-10 hidden group-hover:block p-2">
              <button onClick={() => setActiveFilter('all')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">全部</button>
              <button onClick={() => setActiveFilter('外套')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">外套</button>
              <button onClick={() => setActiveFilter('上装')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">上装</button>
              <button onClick={() => setActiveFilter('连衣裙')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">连衣裙</button>
              <button onClick={() => setActiveFilter('裤装')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">裤装</button>
              <button onClick={() => setActiveFilter('针织')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">针织</button>
            </div>
          </div>

          {/* Sort */}
          <div className="relative group">
            <button className="flex items-center space-x-2 text-sm font-medium border border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-between">
              <span>排序</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute top-full right-0 w-48 bg-white shadow-lg border border-gray-100 mt-2 z-10 hidden group-hover:block p-2">
              <button onClick={() => setSortOrder('newest')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">最新上架</button>
              <button onClick={() => setSortOrder('asc')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">价格：从低到高</button>
              <button onClick={() => setSortOrder('desc')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">价格：从高到低</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {filteredProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="group">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                  New
                </span>
              )}
               {product.originalPrice && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                    Sale
                  </span>
                )}
            </div>
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{product.name}</h3>
            <div className="flex items-center mt-1 space-x-2">
              <p className="text-sm text-gray-900">¥ {product.price}</p>
              {product.originalPrice && (
                <p className="text-xs text-gray-400 line-through">¥ {product.originalPrice}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          暂无相关商品。
        </div>
      )}
    </div>
  );
};
