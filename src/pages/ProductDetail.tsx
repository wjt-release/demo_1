import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { Star, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useStore();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
    alert('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[activeImage] || product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-[3/4] bg-gray-100 overflow-hidden border-2 ${activeImage === idx ? 'border-black' : 'border-transparent'}`}
              >
                <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>
          
          <p className="text-2xl font-medium mb-6">¥{product.price}</p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-bold mb-4">SIZE</h3>
            <div className="flex space-x-4">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border transition-all ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 text-gray-600 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
             {/* Quantity (Optional implementation, sticking to simple Add To Cart for now) */}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full py-4 text-sm font-bold tracking-widest uppercase transition-colors ${
              selectedSize 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            ADD TO CART
          </button>

          <div className="mt-12 border-t pt-8 space-y-4 text-sm text-gray-500">
            <p>Free standard shipping on orders over ¥500</p>
            <p>Estimated delivery: 3-5 business days</p>
            <p>30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};
