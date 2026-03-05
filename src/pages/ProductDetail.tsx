import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingBag, ChevronRight, Truck, RotateCcw, Shield } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/common';
import { ProductGallery, SizeSelector, ReviewList } from '@/components/product';
import { products, reviews } from '@/data';
import { useCartStore } from '@/stores/cartStore';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCartStore();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-neutral-500">商品不存在</p>
          <Link to="/products" className="text-neutral-900 underline mt-4 inline-block">
            返回商品列表
          </Link>
        </div>
      </Layout>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === id);
  const averageRating = productReviews.length > 0
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('请选择尺码');
      return;
    }
    if (!selectedColor) {
      alert('请选择颜色');
      return;
    }

    addItem(product, selectedSize, selectedColor, quantity);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
          <Link to="/" className="hover:text-neutral-900">首页</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-neutral-900">商品</Link>
          <ChevronRight size={14} />
          <span className="text-neutral-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{product.category}</p>
                  <h1 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">
                    {product.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-semibold text-neutral-900">
                  ¥{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-neutral-400 line-through">
                      ¥{product.originalPrice}
                    </span>
                    <span className="px-2 py-0.5 bg-[#1e3a5f] text-white text-xs rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed mt-4">
                {product.description}
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <span className="text-sm font-medium text-neutral-900">颜色选择</span>
                  <div className="flex items-center gap-3 mt-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color.name
                            ? 'border-neutral-900 ring-2 ring-neutral-900 ring-offset-2'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-neutral-500 mt-2">已选: {selectedColor}</p>
                  )}
                </div>

                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                  stock={product.stock}
                />

                <div>
                  <span className="text-sm font-medium text-neutral-900">数量</span>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-neutral-200 rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-neutral-500">
                      库存: {product.stock}件
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 relative"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  加入购物车
                  {showAddedMessage && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded"
                    >
                      已添加
                    </motion.span>
                  )}
                </Button>
                <Link to="/checkout" className="flex-1">
                  <Button variant="outline" size="lg" fullWidth>
                    立即购买
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-neutral-100">
                <div className="flex flex-col items-center text-center">
                  <Truck size={20} className="text-neutral-400 mb-2" />
                  <span className="text-xs text-neutral-600">免费配送</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw size={20} className="text-neutral-400 mb-2" />
                  <span className="text-xs text-neutral-600">7天退换</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield size={20} className="text-neutral-400 mb-2" />
                  <span className="text-xs text-neutral-600">正品保障</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-serif font-semibold text-neutral-900 mb-6">
            用户评价
          </h2>
          <ReviewList reviews={productReviews} averageRating={averageRating} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
