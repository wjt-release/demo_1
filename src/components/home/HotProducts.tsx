import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { products } from '@/data';
import ProductCard from '@/components/product/ProductCard';

const HotProducts = () => {
  const hotProducts = products.filter((p) => p.isHot).slice(0, 8);

  return (
    <section className="py-12 md:py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">
              热销推荐
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              深受喜爱的经典款式
            </p>
          </div>
          <Link
            to="/products?category=hot"
            className="hidden md:flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            查看全部
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {hotProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <Link
          to="/products?category=hot"
          className="flex md:hidden items-center justify-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mt-6"
        >
          查看全部热销
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </section>
  );
};

export default HotProducts;
