import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../../data/mockData';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../../components/ui/Button';
import { Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>(product?.images[0] || '');
  const addItem = useCartStore(state => state.addItem);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addItem(product, selectedSize);
    alert('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-hide">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-24 flex-shrink-0 border ${selectedImage === img ? 'border-black' : 'border-transparent'}`}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] bg-gray-100 overflow-hidden">
            <img 
              src={selectedImage || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold tracking-tight uppercase">{product.name}</h1>
              {product.isNew && <span className="text-xs font-bold bg-black text-white px-2 py-1 uppercase">New Season</span>}
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <p className="text-2xl font-medium">¥{product.price}</p>
              {product.originalPrice && (
                <p className="text-lg text-gray-400 line-through">¥{product.originalPrice}</p>
              )}
            </div>
            <div className="flex items-center space-x-1 text-yellow-500 text-sm">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-gray-500 ml-2">(No reviews yet)</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border text-sm font-medium transition-colors
                    ${selectedSize === size 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-black border-gray-200 hover:border-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && <p className="text-sm text-gray-500">Selected: {selectedSize}</p>}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Button fullWidth size="lg" onClick={handleAddToCart} disabled={!selectedSize}>
              {selectedSize ? 'ADD TO BAG' : 'SELECT A SIZE'}
            </Button>
          </div>

          <div className="space-y-4 pt-8 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <Truck size={20} />
              <span>Free standard shipping on orders over ¥500</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw size={20} />
              <span>Free returns within 30 days</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} />
              <span>Secure payment processing</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section Placeholder */}
      <div className="mt-20 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold mb-8">REVIEWS</h2>
        <p className="text-gray-500">No reviews yet. Be the first to review this product.</p>
      </div>
    </div>
  );
};
