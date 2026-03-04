import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Share2, Truck, RotateCcw, Shield, Star, Minus, Plus, Check } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { ProductGrid } from '../components/product';
import { getProductById, getBestSellers } from '../data/products';
import { useCartStore, useUserStore } from '../stores';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addItem } = useCartStore();
  const { isLoggedIn } = useUserStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const bestSellers = getBestSellers().filter(p => p.id !== id).slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="page-container">
          <div className="container-custom py-20 text-center">
            <p className="text-primary-gray mb-4">商品不存在</p>
            <Link to="/products">
              <Button>返回商品列表</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('请选择尺码');
      return;
    }
    if (!selectedColor) {
      alert('请选择颜色');
      return;
    }

    addItem(product, quantity, selectedSize, selectedColor);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (!selectedSize) {
      alert('请选择尺码');
      return;
    }
    if (!selectedColor) {
      alert('请选择颜色');
      return;
    }

    addItem(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Layout>
      <div className="page-container">
        <div className="container-custom py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-background-light overflow-hidden">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-primary-black text-white text-xs px-3 py-1">
                    新品
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 bg-accent-navy text-white text-xs px-3 py-1">
                    -{discount}%
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-20 border-2 overflow-hidden ${
                        currentImageIndex === index ? 'border-primary-black' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="font-display text-2xl lg:text-3xl text-primary-black mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-accent-beige text-accent-beige' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-primary-gray">
                  {product.rating} | {product.reviews.length} 条评价
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-medium text-primary-black">
                  ¥{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-primary-gray line-through">
                    ¥{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">颜色</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        selectedColor === color
                          ? 'border-primary-black bg-primary-black text-white'
                          : 'border-gray-300 hover:border-primary-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">尺码</h3>
                  <button className="text-sm text-primary-gray hover:text-primary-black">
                    尺码指南
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 text-sm border transition-colors ${
                        selectedSize === size
                          ? 'border-primary-black bg-primary-black text-white'
                          : 'border-gray-300 hover:border-primary-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">数量</h3>
                <div className="flex items-center border border-gray-300 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-background-light"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-background-light"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <Button variant="secondary" fullWidth onClick={handleAddToCart}>
                  加入购物车
                </Button>
                <Button fullWidth onClick={handleBuyNow}>
                  立即购买
                </Button>
              </div>

              {showAddedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-600 mb-4"
                >
                  <Check size={16} />
                  <span className="text-sm">已添加到购物车</span>
                </motion.div>
              )}

              <div className="flex gap-4 mb-8 text-sm text-primary-gray">
                <button className="flex items-center gap-1 hover:text-primary-black">
                  <Heart size={16} />
                  收藏
                </button>
                <button className="flex items-center gap-1 hover:text-primary-black">
                  <Share2 size={16} />
                  分享
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
                <div className="text-center">
                  <Truck size={20} className="mx-auto mb-2 text-primary-gray" />
                  <span className="text-xs text-primary-gray">免费配送</span>
                </div>
                <div className="text-center">
                  <RotateCcw size={20} className="mx-auto mb-2 text-primary-gray" />
                  <span className="text-xs text-primary-gray">7天退换</span>
                </div>
                <div className="text-center">
                  <Shield size={20} className="mx-auto mb-2 text-primary-gray" />
                  <span className="text-xs text-primary-gray">正品保障</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-16">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'description'
                    ? 'border-primary-black text-primary-black'
                    : 'border-transparent text-primary-gray hover:text-primary-black'
                }`}
              >
                商品详情
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-primary-black text-primary-black'
                    : 'border-transparent text-primary-gray hover:text-primary-black'
                }`}
              >
                用户评价 ({product.reviews.length})
              </button>
            </div>

            <div className="py-8">
              {activeTab === 'description' ? (
                <div className="max-w-3xl">
                  <p className="text-primary-gray leading-relaxed">{product.description}</p>
                </div>
              ) : (
                <div className="max-w-3xl space-y-6">
                  {product.reviews.length > 0 ? (
                    product.reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-background-light rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{review.userName[0]}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{review.userName}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    className={i < review.rating ? 'fill-accent-beige text-accent-beige' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-primary-gray">尺码: {review.size}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-primary-gray">{review.content}</p>
                        <p className="text-xs text-primary-gray mt-2">{review.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-primary-gray py-8">暂无评价</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {bestSellers.length > 0 && (
            <div className="mt-12 lg:mt-16">
              <h2 className="section-title">热门推荐</h2>
              <ProductGrid products={bestSellers} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
