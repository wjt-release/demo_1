import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Share2, Truck, RotateCcw, Shield } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { Button, StarRating } from '@/components/common';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { getProductById, products } from '@/data/products';
import { getReviewsByProductId, getAverageRating } from '@/data/reviews';
import { ProductCard } from '@/components/home';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, isItemInCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  
  const product = getProductById(id || '');
  const reviews = product ? getReviewsByProductId(product.id) : [];
  const averageRating = product ? getAverageRating(product.id) : 0;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  if (!product) {
    return (
      <Layout>
        <Header />
        <main className="page-container flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">商品不存在</h1>
            <Link to="/products">
              <Button variant="primary">返回商品列表</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </Layout>
    );
  }

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('请选择尺码');
      return;
    }
    addItem(product, selectedSize, quantity);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('请选择尺码');
      return;
    }
    addItem(product, selectedSize, quantity);
    navigate('/checkout');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <Layout>
      <Header />
      <main className="page-container">
        <div className="container mx-auto py-8">
          <nav className="text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-primary">首页</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-primary">商品</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setShowLightbox(true)}
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-24 border-2 transition-colors ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    {product.isNew && (
                      <span className="inline-block bg-primary text-white text-xs px-2 py-1 mb-3">
                        新品上市
                      </span>
                    )}
                    <h1 className="font-display text-2xl md:text-3xl font-medium text-primary mb-2">
                      {product.name}
                    </h1>
                  </div>
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors ${
                        isFavorite(product.id)
                          ? 'fill-status-error text-status-error'
                          : 'text-gray-400 hover:text-status-error'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating rating={averageRating} showValue />
                  <span className="text-sm text-gray-500">({reviews.length} 条评价)</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-medium text-primary">
                    ¥{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ¥{product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-status-error">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">选择尺码</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border transition-colors ${
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

              <div className="mb-6">
                <h3 className="font-medium mb-3">数量</h3>
                <div className="flex items-center border border-gray-200 w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-500 hover:text-primary"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-500 hover:text-primary"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <Button variant="outline" size="lg" fullWidth onClick={handleAddToCart}>
                  加入购物车
                </Button>
                <Button variant="primary" size="lg" fullWidth onClick={handleBuyNow}>
                  立即购买
                </Button>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Truck className="w-5 h-5" />
                  <span>全国包邮，订单满299元免运费</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <RotateCcw className="w-5 h-5" />
                  <span>7天无理由退换货</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Shield className="w-5 h-5" />
                  <span>正品保证，假一赔十</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                商品详情
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                用户评价 ({reviews.length})
              </button>
            </div>

            <div className="py-8">
              {activeTab === 'description' ? (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">商品信息</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 text-gray-500 w-32">颜色</td>
                          <td className="py-3">{product.colors.join('、')}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 text-gray-500">尺码</td>
                          <td className="py-3">{product.sizes.join('、')}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 text-gray-500">库存</td>
                          <td className="py-3">{product.stock}件</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">暂无评价</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{review.userName[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium">{review.userName}</p>
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                        </div>
                        <p className="text-gray-600">{review.content}</p>
                        {review.images && review.images.length > 0 && (
                          <div className="flex gap-2 mt-3">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt="评价图片"
                                className="w-20 h-20 object-cover"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium text-primary mb-8">相关推荐</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setShowLightbox(false)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </Layout>
  );
}
