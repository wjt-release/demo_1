import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  Shield,
  Star,
  Minus,
  Plus,
  ZoomIn,
} from 'lucide-react'
import { products } from '../data/products'
import { useCartStore } from '../stores/useCartStore'
import { useAuthStore } from '../stores/useAuthStore'
import { Button } from '../components/common/Button'
import { Modal } from '../components/common/Modal'
import { ProductCard } from '../components/product/ProductCard'
import { formatPrice } from '../utils/format'
import type { Size, ProductColor } from '../types'

export function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === id)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product?.colors[0] || null
  )
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const [showAddedMessage, setShowAddedMessage] = useState(false)

  const addItem = useCartStore((state) => state.addItem)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-h2 mb-4">商品不存在</h2>
          <Button onClick={() => navigate('/products')}>返回商品列表</Button>
        </div>
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('请选择尺码')
      return
    }
    if (!selectedColor) {
      alert('请选择颜色')
      return
    }

    setAddingToCart(true)
    setTimeout(() => {
      addItem(product, selectedSize, selectedColor.name, quantity)
      setAddingToCart(false)
      setShowAddedMessage(true)
      setTimeout(() => setShowAddedMessage(false), 2000)
    }, 500)
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('请选择尺码')
      return
    }
    if (!selectedColor) {
      alert('请选择颜色')
      return
    }

    addItem(product, selectedSize, selectedColor.name, quantity)
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen pb-16">
      <div className="container-custom py-8">
        <nav className="text-small text-gray-500 mb-6">
          <Link to="/" className="hover:text-black">首页</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-black">全部商品</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-black">
            {product.category === 'tops' ? '上装' :
             product.category === 'bottoms' ? '下装' :
             product.category === 'dresses' ? '连衣裙' :
             product.category === 'outerwear' ? '外套' : '配饰'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setShowZoom(true)}
                />
              </AnimatePresence>
              <button
                onClick={() => setShowZoom(true)}
                className="absolute bottom-4 right-4 p-2 bg-white/80 hover:bg-white transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => 
                      (prev - 1 + product.images.length) % product.images.length
                    )}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => 
                      (prev + 1) % product.images.length
                    )}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="badge badge-new">新品</span>}
                {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-24 border-2 transition-colors ${
                      index === currentImageIndex ? 'border-black' : 'border-transparent'
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
            )}
          </div>

          <div>
            <div className="sticky top-24">
              <h1 className="text-h1 font-display mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-small text-gray-500 ml-1">
                    ({product.reviews.length} 评价)
                  </span>
                </div>
                <span className="text-small text-gray-500">已售 {product.sales} 件</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-body text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-body text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-body font-medium">颜色</span>
                  <span className="text-body text-gray-600">{selectedColor?.name}</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 border-2 transition-colors ${
                        selectedColor?.name === color.name
                          ? 'border-black'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-body font-medium">尺码</span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-body text-gray-600 hover:text-black underline"
                  >
                    尺码指南
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2.5 text-body border transition-colors ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <span className="text-body font-medium block mb-3">数量</span>
                <div className="flex items-center border border-gray-300 w-fit">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 text-body min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  loading={addingToCart}
                >
                  {showAddedMessage ? '已添加到购物车' : '加入购物车'}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={handleBuyNow}
                >
                  立即购买
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <button className="flex items-center gap-2 text-body text-gray-600 hover:text-black transition-colors">
                  <Heart className="w-5 h-5" />
                  收藏
                </button>
                <button className="flex items-center gap-2 text-body text-gray-600 hover:text-black transition-colors">
                  <Share2 className="w-5 h-5" />
                  分享
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-body text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span>全国包邮，预计3-5个工作日送达</span>
                </div>
                <div className="flex items-center gap-3 text-body text-gray-600">
                  <RotateCcw className="w-5 h-5" />
                  <span>7天无理由退换货</span>
                </div>
                <div className="flex items-center gap-3 text-body text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>正品保证，假一赔十</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="section-title">用户评价</h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-body font-medium">
                        {review.userName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-body font-medium">{review.userName}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-small text-gray-500">
                          尺码：{review.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-body text-gray-600">{review.content}</p>
                  <p className="text-small text-gray-400 mt-2">{review.createdAt}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              暂无评价
            </div>
          )}
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="section-title">相关推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Modal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        title="尺码指南"
        size="lg"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-body">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left font-medium">尺码</th>
                <th className="py-3 px-4 text-left font-medium">胸围 (cm)</th>
                <th className="py-3 px-4 text-left font-medium">腰围 (cm)</th>
                <th className="py-3 px-4 text-left font-medium">臀围 (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">XS</td>
                <td className="py-3 px-4">80-84</td>
                <td className="py-3 px-4">60-64</td>
                <td className="py-3 px-4">86-90</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">S</td>
                <td className="py-3 px-4">84-88</td>
                <td className="py-3 px-4">64-68</td>
                <td className="py-3 px-4">90-94</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">M</td>
                <td className="py-3 px-4">88-92</td>
                <td className="py-3 px-4">68-72</td>
                <td className="py-3 px-4">94-98</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">L</td>
                <td className="py-3 px-4">92-96</td>
                <td className="py-3 px-4">72-76</td>
                <td className="py-3 px-4">98-102</td>
              </tr>
              <tr>
                <td className="py-3 px-4">XL</td>
                <td className="py-3 px-4">96-100</td>
                <td className="py-3 px-4">76-80</td>
                <td className="py-3 px-4">102-106</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-small text-gray-500 mt-4">
          * 以上尺寸仅供参考，实际尺寸可能因款式不同略有差异
        </p>
      </Modal>

      <Modal
        isOpen={showZoom}
        onClose={() => setShowZoom(false)}
        size="xl"
        showClose={true}
      >
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-auto max-h-[80vh] object-contain"
        />
      </Modal>
    </div>
  )
}
