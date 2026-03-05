import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { Product } from '../types';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      const timer = setTimeout(() => setShowPopup(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('hasVisited', 'true');
  };

  const featuredProducts = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-gray-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" 
          alt="New Collection" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">SPRING 2026</h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-lg">
            Discover the new collection. Minimalist silhouettes meeting modern versatility.
          </p>
          <Link to="/products?category=new">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 border-none">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/products?category=coats" className="relative h-[500px] group overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop" 
              alt="Coats" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white text-3xl font-bold tracking-widest uppercase border-b-2 border-white pb-2">Coats</span>
            </div>
          </Link>
          <div className="grid grid-rows-2 gap-4">
            <Link to="/products?category=dresses" className="relative h-full group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop" 
                alt="Dresses" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white text-2xl font-bold tracking-widest uppercase border-b-2 border-white pb-1">Dresses</span>
              </div>
            </Link>
            <Link to="/products?category=tops" className="relative h-full group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop" 
                alt="Tops" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white text-2xl font-bold tracking-widest uppercase border-b-2 border-white pb-1">Tops</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">BEST SELLERS</h2>
          <Link to="/products" className="text-sm font-medium border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">¥{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New User Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white p-8 max-w-md w-full text-center relative shadow-2xl">
            <button 
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-2">WELCOME TO MODA.</h3>
            <p className="text-gray-600 mb-6">
              Sign up for our newsletter and get <span className="font-bold text-black">10% OFF</span> your first order.
            </p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleClosePopup(); }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-3 border border-gray-300 focus:border-black outline-none text-sm"
              />
              <Button fullWidth onClick={handleClosePopup}>SUBSCRIBE</Button>
            </form>
            <button 
              onClick={handleClosePopup}
              className="text-xs text-gray-400 mt-4 hover:text-black underline"
            >
              No thanks, I'll pay full price
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
