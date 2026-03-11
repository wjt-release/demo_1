import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, ShoppingBag, CreditCard, X, Heart } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button, StarRating } from '@/components/common';
import { useDeliveryStore } from '@/store/deliveryStore';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { getMerchantById, getProductsByMerchant, getReviewsByMerchant, getMerchantCategories } from '@/data/deliveryMerchants';

export function DeliveryMerchant() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  const { currentMerchant, merchantProducts, merchantReviews, setCurrentMerchant, setMerchantProducts, setMerchantReviews } = useDeliveryStore();
  const { addItem } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    if (id) {
      const merchant = getMerchantById(id);
      if (merchant) {
        setCurrentMerchant(merchant);
        setMerchantProducts(getProductsByMerchant(id));
        setMerchantReviews(getReviewsByMerchant(id));
      }
    }
    return () => {
      setCurrentMerchant(null);
      setMerchantProducts([]);
      setMerchantReviews([]);
    };
  }, [id, setCurrentMerchant, setMerchantProducts, setMerchantReviews]);

  const categories = useMemo(() => {
    if (!id) return [];
    return getMerchantCategories(id);
  }, [id]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return merchantProducts;
    return merchantProducts.filter((p) => p.category === selectedCategory);
  }, [merchantProducts, selectedCategory]);

  const handleOpenSizeModal = (product: any) => {
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
    navigate('/checkout');
  };

  if (!currentMerchant) {
    return (
      <Layout>
        <div className="min-h-screen bg-secondary-light flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">商家不存在</p>
            <Link to="/delivery" className="text-[#0066FF]">
              返回快递服务
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-secondary-light">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={currentMerchant.coverImage}
            alt={currentMerchant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={() => navigate('/delivery')}
            className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-white p-6 mb-6">
            <div className="flex items-start gap-4">
              <img
                src={currentMerchant.logo}
                alt={currentMerchant.name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover -mt-12"
              />
              <div className="flex-1">
                <h1 className="font-display text-xl font-medium text-primary mb-1">
                  {currentMerchant.name}
                </h1>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{currentMerchant.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">|</span>
                  <span className="text-gray-500 text-sm">{currentMerchant.reviewCount}条评价</span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2">{currentMerchant.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#0066FF] mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {currentMerchant.deliveryTimeMin}-{currentMerchant.deliveryTimeMax}小时
                  </span>
                </div>
                <span className="text-xs text-gray-400">配送时间</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#0066FF] mb-1">
                  <span className="text-sm font-medium">
                    ¥{currentMerchant.minOrderAmount}起送
                  </span>
                </div>
                <span className="text-xs text-gray-400">起送价</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                  <span className="text-sm font-medium">
                    {currentMerchant.deliveryFee === 0 ? '免运费' : `¥${currentMerchant.deliveryFee}`}
                  </span>
                </div>
                <span className="text-xs text-gray-400">运费</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-[#0066FF]" />
                <span>配送区域：{currentMerchant.deliveryAreas.join('、')}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {currentMerchant.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#0066FF]/10 text-[#0066FF] text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 mb-6">
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`shrink-0 px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === null
                    ? 'bg-[#0066FF] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                全部商品
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#0066FF] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {filteredProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white"
              >
                <div className="relative">
                  <Link to={`/products/${item.product.id}`}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full aspect-[3/4] object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => toggleFavorite(item.product)}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFavorite(item.product.id)
                          ? 'fill-status-error text-status-error'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>
                <div className="p-3">
                  <Link to={`/products/${item.product.id}`}>
                    <h3 className="text-sm font-medium text-primary line-clamp-2 hover:underline">
                      {item.product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[#FF2D55] font-medium">
                      ¥{item.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenSizeModal(item)}
                    className="w-full mt-3 py-2 bg-[#0066FF] text-white text-sm hover:bg-[#0066FF]/90 transition-colors"
                  >
                    加入购物车
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {merchantReviews.length > 0 && (
            <div className="bg-white p-6 mb-6">
              <h3 className="font-display text-lg font-medium text-primary mb-4">
                用户评价
              </h3>
              <div className="space-y-4">
                {merchantReviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-primary">{review.userName}</span>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-sm text-gray-600">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                      <span className="text-[#FF2D55] text-xl font-bold">
                        ¥{selectedProduct.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-primary mb-3">尺码</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.product.sizes.map((size: string) => (
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
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#0066FF] text-[#0066FF] font-medium hover:bg-gray-50 transition-colors"
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
      </div>
    </Layout>
  );
}
