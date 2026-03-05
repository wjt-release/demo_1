import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, X, Gift } from 'lucide-react';
import { Layout } from '@/components/layout';
import { ProductCard, Button } from '@/components/ui';
import { ImageCarousel } from '@/components/shared';
import { products, banners } from '@/data';
import { storage } from '@/utils/storage';

export function Home() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isNewUser = storage.get<boolean>('isNewUser');
    if (isNewUser === null) {
      setTimeout(() => setShowNewUserModal(true), 1500);
    }
  }, []);

  const handleCloseModal = () => {
    setShowNewUserModal(false);
    storage.set('isNewUser', false);
  };

  const newProducts = products
    .filter(p => p.tags.includes('新品'))
    .slice(0, 6);

  const hotProducts = [...products]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 8);

  return (
    <Layout>
      <section className="relative">
        <ImageCarousel
          images={banners.map(b => b.image)}
          aspectRatio="video"
          autoPlay
          interval={4000}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-serif font-bold mb-4 drop-shadow-lg"
            >
              {banners[0]?.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl mb-6 drop-shadow-md"
            >
              {banners[0]?.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pointer-events-auto"
            >
              <Button
                onClick={() => navigate('/products')}
                className="bg-white text-black hover:bg-gray-100"
              >
                立即探索
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-serif font-bold">新品上市</h2>
            <Link
              to="/products?category=new"
              className="flex items-center text-sm text-gray-600 hover:text-black transition-colors"
            >
              查看全部
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="relative -mx-4 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 px-4 pb-4">
              {newProducts.map((product, index) => (
                <div key={product.id} className="w-40 md:w-52 flex-shrink-0">
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#E8E0D5]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-serif font-bold">热销商品</h2>
            <Link
              to="/products"
              className="flex items-center text-sm text-gray-600 hover:text-black transition-colors"
            >
              查看全部
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {hotProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/products?category=dresses" className="group relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=600&fit=crop"
                alt="连衣裙"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">连衣裙系列</h3>
                  <p className="text-sm opacity-90">优雅气质，尽显女性魅力</p>
                </div>
              </div>
            </Link>
            <Link to="/products?category=outerwear" className="group relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=600&fit=crop"
                alt="外套"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">外套精选</h3>
                  <p className="text-sm opacity-90">温暖与时尚兼得</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {showNewUserModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl overflow-hidden max-w-sm w-full shadow-xl"
          >
            <div className="relative h-48 bg-gradient-to-br from-[#1E3A5F] to-[#1A1A1A] flex items-center justify-center">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
              <div className="text-center text-white">
                <Gift size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold mb-2">新人专享</h3>
                <p className="text-lg">首单立减 ¥50</p>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-6">
                注册即享新人专属优惠，更有会员积分等你拿
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    handleCloseModal();
                    navigate('/login');
                  }}
                  className="w-full"
                >
                  立即注册
                </Button>
                <button
                  onClick={handleCloseModal}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  稍后再说
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}
