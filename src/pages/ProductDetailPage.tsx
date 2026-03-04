import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(state => state.addItem);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return <div className="text-center py-20">商品不存在</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('请选择尺码');
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1,
    });
    // Optional: Show toast or open cart drawer
    navigate('/cart');
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative group">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImageIndex}
                src={product.images[selectedImageIndex]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>
            
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          <div className="flex space-x-4 mt-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={cn(
                  "w-20 h-24 flex-shrink-0 overflow-hidden border-2 transition-colors",
                  selectedImageIndex === idx ? "border-black" : "border-transparent"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-sm text-gray-500 underline">{product.reviewCount} 条评价</span>
          </div>

          <p className="text-2xl font-medium text-gray-900 mb-6">¥ {product.price}</p>
          
          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">选择尺码</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "border py-2 text-sm font-medium transition-colors hover:border-black",
                    selectedSize === size 
                      ? "border-black bg-black text-white" 
                      : "border-gray-200 text-gray-900"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
             <h3 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">商品详情</h3>
             <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
               {product.details.map((detail, idx) => (
                 <li key={idx}>{detail}</li>
               ))}
             </ul>
          </div>

          <Button 
            onClick={handleAddToCart}
            size="lg"
            className="w-full py-4 text-lg uppercase tracking-widest"
          >
            加入购物车
          </Button>
          
          <div className="mt-8 pt-8 border-t border-gray-100">
             <h3 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">用户评价</h3>
             {/* Mock Reviews */}
             <div className="space-y-6">
               <div className="border-b border-gray-50 pb-4">
                 <div className="flex justify-between items-center mb-2">
                   <span className="font-medium text-sm">用户 A</span>
                   <span className="text-xs text-gray-400">2023-10-12</span>
                 </div>
                 <p className="text-sm text-gray-600">质量非常好，穿着很舒服，版型也很正。</p>
               </div>
               <div className="border-b border-gray-50 pb-4">
                 <div className="flex justify-between items-center mb-2">
                   <span className="font-medium text-sm">用户 B</span>
                   <span className="text-xs text-gray-400">2023-09-28</span>
                 </div>
                 <p className="text-sm text-gray-600">发货速度快，包装精美，非常满意。</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
