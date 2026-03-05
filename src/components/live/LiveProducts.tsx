import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, CreditCard, X } from 'lucide-react';
import { LiveProduct } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface LiveProductsProps {
  products: LiveProduct[];
}

export function LiveProducts({ products }: LiveProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<LiveProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const { addItem } = useCartStore();

  useEffect(() => {
    const timers: Record<string, number> = {};
    products.forEach((p) => {
      timers[p.id] = Math.max(0, Math.floor((p.discountEndTime - Date.now()) / 1000));
    });
    setTimeLeft(timers);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = { ...prev };
        products.forEach((p) => {
          if (next[p.id] > 0) {
            next[p.id] = Math.max(0, Math.floor((p.discountEndTime - Date.now()) / 1000));
          }
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [products]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOpenSizeModal = (product: LiveProduct) => {
    setSelectedProduct(product);
    setSelectedSize(product.product.sizes[0]);
    setShowSizeModal(true);
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize) return;
    addItem(selectedProduct.product, selectedSize, 1);
    setShowSizeModal(false);
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedProduct || !selectedSize) return;
    addItem(selectedProduct.product, selectedSize, 1);
    setShowSizeModal(false);
    window.location.href = '/checkout';
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];

  return (
    <>
      <div className="bg-black/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white text-sm font-medium">直播商品</span>
          <span className="text-xs text-gray-400">{currentIndex + 1}/{products.length}</span>
        </div>

        <div className="relative">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <Link 
              to={`/products/${currentProduct.product.id}`}
              className="w-20 h-24 shrink-0 overflow-hidden block"
            >
              <img
                src={currentProduct.product.images[0]}
                alt={currentProduct.product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link 
                to={`/products/${currentProduct.product.id}`}
                className="text-white text-sm font-medium line-clamp-2 mb-1 hover:text-[#FF2D55] transition-colors block"
              >
                {currentProduct.product.name}
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#FF2D55] text-lg font-bold">
                  ¥{currentProduct.discountPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 text-xs line-through">
                  ¥{currentProduct.product.price.toFixed(2)}
                </span>
                <span className="text-xs text-[#FF2D55] bg-[#FF2D55]/20 px-1.5 py-0.5 rounded">
                  直播专享
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-[#FF2D55]">
                  <span className="animate-pulse">限时</span>
                  <span className="font-mono">{formatTime(timeLeft[currentProduct.id] || 0)}</span>
                </div>
                <button
                  onClick={() => handleOpenSizeModal(currentProduct)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#FF2D55] text-white text-xs rounded-full hover:bg-[#FF2D55]/90 transition-colors"
                >
                  <ShoppingBag className="w-3 h-3" />
                  立即购买
                </button>
              </div>
            </div>
          </motion.div>

          {products.length > 1 && (
            <>
              <button
                onClick={prevProduct}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 p-1 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={nextProduct}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 p-1 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </>
          )}
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {products.map((product, index) => (
            <button
              key={product.id}
              onClick={() => setCurrentIndex(index)}
              className={`shrink-0 w-12 h-12 overflow-hidden border-2 transition-colors ${
                currentIndex === index ? 'border-[#FF2D55]' : 'border-transparent'
              }`}
            >
              <img
                src={product.product.images[0]}
                alt={product.product.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showSizeModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
            onClick={() => setShowSizeModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-white rounded-t-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-medium text-primary">选择尺码</h3>
                <button
                  onClick={() => setShowSizeModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex gap-4 mb-4">
                  <img
                    src={selectedProduct.product.images[0]}
                    alt={selectedProduct.product.name}
                    className="w-20 h-24 object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-primary line-clamp-2 mb-2">
                      {selectedProduct.product.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF2D55] text-xl font-bold">
                        ¥{selectedProduct.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-gray-400 text-sm line-through">
                        ¥{selectedProduct.product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-primary mb-3">尺码</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border text-sm transition-colors ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-200 hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-primary text-primary font-medium hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    加入购物车
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF2D55] text-white font-medium hover:bg-[#FF2D55]/90 transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    立即下单
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            已加入购物车
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
