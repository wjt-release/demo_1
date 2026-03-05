import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { banners, products } from '../data/products'
import { ProductCard } from '../components/product/ProductCard'
import { Button } from '../components/common/Button'

export function Home() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const bannerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('luxe-welcome-shown')
    if (!hasSeenWelcome) {
      setTimeout(() => setShowWelcomeModal(true), 1000)
    }
  }, [])

  useEffect(() => {
    bannerRef.current = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => {
      if (bannerRef.current) {
        clearInterval(bannerRef.current)
      }
    }
  }, [])

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false)
    localStorage.setItem('luxe-welcome-shown', 'true')
  }

  const newProducts = products.filter((p) => p.isNew).slice(0, 8)
  const bestSellers = [...products].sort((a, b) => b.sales - a.sales).slice(0, 8)

  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={banners[currentBanner].image}
              alt={banners[currentBanner].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-display font-semibold mb-4"
                >
                  {banners[currentBanner].title}
                </motion.h2>
                {banners[currentBanner].subtitle && (
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl mb-6"
                  >
                    {banners[currentBanner].subtitle}
                  </motion.p>
                )}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to={banners[currentBanner].link || '/products'}
                    className="inline-block bg-white text-black px-8 py-3 text-body font-medium hover:bg-gray-100 transition-colors"
                  >
                    立即探索
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
          aria-label="上一张"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
          aria-label="下一张"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentBanner ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`跳转到第 ${index + 1} 张`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">新品推荐</h2>
            <Link
              to="/products?category=new"
              className="text-body text-gray-600 hover:text-black transition-colors"
            >
              查看全部 →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 lg:grid-cols-4">
            {newProducts.map((product, index) => (
              <div key={product.id} className="w-64 md:w-auto flex-shrink-0">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">热销商品</h2>
            <Link
              to="/products?sort=sales"
              className="text-body text-gray-600 hover:text-black transition-colors"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/products?category=dresses"
              className="relative aspect-[4/3] overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=600&fit=crop"
                alt="连衣裙系列"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2">
                    连衣裙系列
                  </h3>
                  <p className="text-body">优雅气质，尽显魅力</p>
                </div>
              </div>
            </Link>
            <Link
              to="/products?category=outerwear"
              className="relative aspect-[4/3] overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=600&fit=crop"
                alt="外套系列"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2">
                    外套系列
                  </h3>
                  <p className="text-body">经典款式，品质之选</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-beige-100">
        <div className="container-custom text-center">
          <h2 className="section-title">订阅我们</h2>
          <p className="text-body text-gray-600 mb-6 max-w-md mx-auto">
            订阅邮件，第一时间获取新品资讯、独家优惠和穿搭灵感
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="请输入您的邮箱"
              className="flex-1 input-field"
            />
            <Button variant="primary">订阅</Button>
          </form>
        </div>
      </section>

      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeWelcomeModal}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white max-w-md w-full overflow-hidden"
            >
              <button
                onClick={closeWelcomeModal}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 transition-colors z-10"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=450&fit=crop"
                  alt="欢迎"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-h2 font-display mb-2">欢迎来到 LUXE</h3>
                <p className="text-body text-gray-600 mb-4">
                  新用户注册即享 <span className="text-error font-medium">首单9折</span> 优惠
                </p>
                <p className="text-small text-gray-500 mb-6">
                  使用优惠码：<span className="font-medium text-black">WELCOME10</span>
                </p>
                <div className="flex gap-3">
                  <Link
                    to="/register"
                    className="flex-1"
                    onClick={closeWelcomeModal}
                  >
                    <Button variant="primary" fullWidth>
                      立即注册
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={closeWelcomeModal}
                  >
                    先逛逛
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
