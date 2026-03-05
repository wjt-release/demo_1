import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingBag, Minus, Plus, ChevronLeft, Star } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { ImageCarousel, SizeSelector, Rating } from '@/components/shared';
import { products, reviews } from '@/data';
import { useCartStore, useAuthStore } from '@/stores';
import { formatPrice, formatDate } from '@/utils/format';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const product = products.find(p => p.id === id);
  const productReviews = reviews.filter(r => r.productId === id);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">商品不存在</p>
          <Button onClick={() => navigate('/products')}>返回商品列表</Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('请选择尺码');
      return;
    }
    addItem(product, selectedSize, quantity);
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('请选择尺码');
      return;
    }
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/checkout?productId=${product.id}&size=${selectedSize}&quantity=${quantity}` } });
      return;
    }
    addItem(product, selectedSize, quantity);
    navigate('/checkout');
  };

  const averageRating = productReviews.length > 0
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          返回
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <ImageCarousel
              images={product.images}
              aspectRatio="portrait"
              autoPlay={false}
              showDots={product.images.length > 1}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Rating rating={averageRating} size="sm" />
                  <span className="text-sm text-gray-500">({productReviews.length} 条评价)</span>
                </div>
                <span className="text-sm text-gray-500">已售 {product.salesCount} 件</span>
              </div>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">数量</span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} variant="outline" className="flex-1">
                <ShoppingBag size={18} className="mr-2" />
                加入购物车
              </Button>
              <Button onClick={handleBuyNow} className="flex-1">
                立即购买
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors">
                <Heart size={18} />
                <span>收藏</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors">
                <Share2 size={18} />
                <span>分享</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'description'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              商品详情
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              用户评价 ({productReviews.length})
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="py-8">
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-medium mb-4">商品特点</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>优质面料，舒适透气</li>
                  <li>精致剪裁，修身显瘦</li>
                  <li>经典设计，百搭时尚</li>
                  <li>适合多种场合穿着</li>
                </ul>
                <h3 className="text-lg font-medium mt-8 mb-4">尺码参考</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 text-left font-medium">尺码</th>
                        <th className="py-2 text-left font-medium">胸围</th>
                        <th className="py-2 text-left font-medium">腰围</th>
                        <th className="py-2 text-left font-medium">臀围</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">XS</td>
                        <td className="py-2">80-84</td>
                        <td className="py-2">60-64</td>
                        <td className="py-2">86-90</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">S</td>
                        <td className="py-2">84-88</td>
                        <td className="py-2">64-68</td>
                        <td className="py-2">90-94</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">M</td>
                        <td className="py-2">88-92</td>
                        <td className="py-2">68-72</td>
                        <td className="py-2">94-98</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">L</td>
                        <td className="py-2">92-96</td>
                        <td className="py-2">72-76</td>
                        <td className="py-2">98-102</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8">
              {productReviews.length > 0 ? (
                <div className="space-y-6">
                  {productReviews.map(review => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b border-gray-100 pb-6 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{review.userName[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium">{review.userName}</p>
                            <Rating rating={review.rating} size="sm" />
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                      </div>
                      <p className="text-gray-600">{review.content}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">暂无评价</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showAddedToCart && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg z-50"
        >
          已添加到购物车
        </motion.div>
      )}
    </Layout>
  );
}
