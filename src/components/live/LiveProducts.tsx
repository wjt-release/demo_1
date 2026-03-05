import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { LiveProduct } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface LiveProductsProps {
  products: LiveProduct[];
}

export function LiveProducts({ products }: LiveProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
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

  const handleAddToCart = (product: LiveProduct) => {
    addItem(product.product, product.product.sizes[0], 1);
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
          <div className="w-20 h-24 shrink-0 overflow-hidden">
            <img
              src={currentProduct.product.images[0]}
              alt={currentProduct.product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
              {currentProduct.product.name}
            </h4>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#FF2D55] text-lg font-bold">
                ¥{currentProduct.discountPrice.toFixed(2)}
              </span>
              <span className="text-gray-500 text-xs line-through">
                ¥{currentProduct.product.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-[#FF2D55]">
                <span className="animate-pulse">限时</span>
                <span className="font-mono">{formatTime(timeLeft[currentProduct.id] || 0)}</span>
              </div>
              <button
                onClick={() => handleAddToCart(currentProduct)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#FF2D55] text-white text-xs rounded-full hover:bg-[#FF2D55]/90 transition-colors"
              >
                <ShoppingBag className="w-3 h-3" />
                加购
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
  );
}
