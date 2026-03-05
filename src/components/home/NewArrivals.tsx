import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { products } from '@/data';
import ProductCard from '@/components/product/ProductCard';

const NewArrivals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const newProducts = products.filter((p) => p.isNew).slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">
              新品上市
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              探索本季最新设计
            </p>
          </div>
          <Link
            to="/products?category=new"
            className="hidden md:flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            查看全部
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {newProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex-shrink-0 w-64 md:w-72"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg border border-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ChevronRight size={20} className="rotate-180" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg border border-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <Link
          to="/products?category=new"
          className="flex md:hidden items-center justify-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mt-4"
        >
          查看全部新品
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </section>
  );
};

export default NewArrivals;
