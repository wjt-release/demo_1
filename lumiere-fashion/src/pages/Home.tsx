import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button, Modal } from '../components/common';
import { ProductGrid } from '../components/product';
import { banners, getNewArrivals, getBestSellers } from '../data/products';
import { useUserStore } from '../stores';

export const Home: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { isLoggedIn } = useUserStore();
  
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('lumiere-welcome-shown');
    if (!hasSeenWelcome && !isLoggedIn) {
      setTimeout(() => setShowWelcomeModal(true), 1500);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcomeModal(false);
    localStorage.setItem('lumiere-welcome-shown', 'true');
  };

  const nextBanner = () => {
    setCurrentBanner(prev => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <Layout>
      <section className="relative h-[60vh] lg:h-[80vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banners[currentBanner].image})` }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-4xl lg:text-6xl mb-4"
                  >
                    {banners[currentBanner].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg lg:text-xl mb-8"
                  >
                    {banners[currentBanner].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link to={banners[currentBanner].link}>
                      <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-primary-black">
                        立即探索
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
        >
          <ChevronRight size={40} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentBanner ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">新品上市</h2>
            <Link
              to="/products?category=new"
              className="hidden sm:flex items-center text-sm text-primary-gray hover:text-primary-black transition-colors"
            >
              查看全部 <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <ProductGrid products={newArrivals.slice(0, 4)} />
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products?category=new">
              <Button variant="outline">查看全部新品</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background-light">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">热销推荐</h2>
            <Link
              to="/products?sort=hot"
              className="hidden sm:flex items-center text-sm text-primary-gray hover:text-primary-black transition-colors"
            >
              查看全部 <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <ProductGrid products={bestSellers.slice(0, 4)} />
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products?sort=hot">
              <Button variant="outline">查看全部热销</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="春季系列"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-display text-2xl lg:text-4xl mb-4">春季系列</h3>
                  <Link to="/products?category=dresses">
                    <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-primary-black">
                      探索更多
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"
                alt="限时特惠"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-display text-2xl lg:text-4xl mb-4">限时特惠</h3>
                  <Link to="/products?category=sale">
                    <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-primary-black">
                      立即选购
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={showWelcomeModal} onClose={handleCloseWelcome}>
        <div className="text-center">
          <h2 className="font-display text-2xl lg:text-3xl text-primary-black mb-4">
            欢迎来到 LUMIÈRE
          </h2>
          <p className="text-primary-gray mb-6">
            注册成为会员，享受专属优惠和最新资讯
          </p>
          <div className="space-y-3">
            <Link to="/register" onClick={handleCloseWelcome}>
              <Button fullWidth>立即注册</Button>
            </Link>
            <Button variant="outline" fullWidth onClick={handleCloseWelcome}>
              先逛逛
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
