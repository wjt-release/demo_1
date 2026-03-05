import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../mock/data';
import { useCartStore } from '../store/useStore';
import { Button } from '../components/common/Button';
import { Star, Truck, ShieldCheck, Heart } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCartStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-xl uppercase tracking-widest text-gray-500">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    // Could add toast notification here
    alert('Added to cart!');
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden bg-zinc-100 rounded-lg">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-zinc-100 rounded-md overflow-hidden cursor-pointer hover:opacity-75">
                <img src={product.image} alt={`Detail ${i}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase mb-2">{product.name}</h1>
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={1.5} />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>
          
          <p className="text-2xl font-medium text-gray-900 mb-8">{product.currency} {product.price}</p>
          
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">Description</h3>
            <p className="text-base text-gray-500 leading-relaxed">{product.description}</p>
          </div>

          {/* Selections */}
          <div className="mb-8 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor === color ? 'border-black scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() === 'champagne' ? '#F7E7CE' : color.toLowerCase() }}
                    title={color}
                  >
                    {selectedColor === color && <span className="block w-2 h-2 bg-white rounded-full mix-blend-difference" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">Size</h3>
                <button className="text-xs text-gray-500 underline uppercase tracking-wide">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-6">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-3 text-sm font-medium uppercase transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-zinc-200 text-gray-900 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-10">
            <Button onClick={handleAddToCart} className="flex-1 py-4 text-base">Add to Cart</Button>
            <Button variant="secondary" className="px-4">
              <Heart size={20} />
            </Button>
          </div>

          <div className="border-t border-zinc-200 pt-8 space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <Truck size={18} />
              <span>Free shipping on orders over ¥500</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <ShieldCheck size={18} />
              <span>Secure payment & 30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
