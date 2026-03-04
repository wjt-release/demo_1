import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage = () => {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-gray-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2070")' }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-sm md:text-base font-medium tracking-[0.2em] mb-4 uppercase">2026 春夏系列</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              简约<br/>至上
            </h1>
            <p className="text-lg md:text-xl mb-8 font-light text-gray-200">
              探索极简主义美学，重新定义都市女性的优雅与自信。
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 border-none px-8 py-4 text-base tracking-wider">
                立即选购
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">新品上市</h2>
          <Link to="/products?category=new" className="text-sm font-medium text-gray-500 hover:text-black flex items-center group">
            查看更多 <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {newArrivals.map((product) => (
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
              </div>
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">¥ {product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="w-full h-[50vh] bg-gray-900 relative overflow-hidden flex items-center justify-center text-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070")' }}
        />
        <div className="relative z-10 max-w-2xl text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-widest">限时折扣</h2>
          <p className="text-lg mb-8 text-gray-300">精选换季单品，低至 5 折起。数量有限，售完即止。</p>
          <Link to="/products?category=sale">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black px-10">
              浏览折扣
            </Button>
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">热销排行</h2>
          <Link to="/products?sort=best-selling" className="text-sm font-medium text-gray-500 hover:text-black flex items-center group">
            查看更多 <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {bestSellers.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
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
      </section>
    </div>
  );
};
