import React, { useState, useEffect } from 'react';
import { Carousel } from '../components/common/Carousel';
import { ProductList } from '../components/product/ProductList';
import { products } from '../mock/data';
import { X } from 'lucide-react';
import { useUIStore } from '../store/useStore';

export const Home = () => {
  const { isNewUserModalOpen, closeNewUserModal } = useUIStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after 1 second if it's supposed to be open
    if (isNewUserModalOpen) {
      const timer = setTimeout(() => setShowModal(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isNewUserModalOpen]);

  const featuredProducts = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.slice(0, 4);

  const slides = [
    { title: "New Season", subtitle: "Minimalist Essentials", image: "https://placehold.co/1920x1080/e5e5e5/000000?text=NEW+SEASON" },
    { title: "Summer Collection", subtitle: "Effortless Style", image: "https://placehold.co/1920x1080/e5e5e5/000000?text=SUMMER+COLLECTION" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Carousel */}
      <Carousel slides={slides} />

      {/* New Arrivals Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">New Arrivals</h2>
            <a href="/shop" className="text-sm font-medium text-gray-500 hover:text-black uppercase tracking-wider">View all</a>
          </div>
          <ProductList products={featuredProducts} />
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-zinc-100 py-24 text-center">
        <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">The Modern Edit</h2>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">Discover our curated selection of timeless pieces designed for the contemporary woman.</p>
        <button className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors">
          Explore Now
        </button>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 uppercase mb-8">Best Sellers</h2>
          <ProductList products={bestSellers} />
        </div>
      </section>

      {/* New User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white p-8 max-w-md w-full relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => { setShowModal(false); closeNewUserModal(); }} className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-2 text-center">Welcome</h3>
            <p className="text-center text-gray-500 mb-6">Sign up for our newsletter and get 10% off your first order.</p>
            <input type="email" placeholder="Email Address" className="w-full border-b border-gray-300 py-2 mb-4 outline-none focus:border-black" />
            <button className="w-full bg-black text-white py-3 uppercase tracking-widest text-sm hover:bg-zinc-800">Subscribe</button>
            <button onClick={() => { setShowModal(false); closeNewUserModal(); }} className="w-full mt-4 text-xs text-gray-400 uppercase tracking-widest hover:text-black">No thanks</button>
          </div>
        </div>
      )}
    </div>
  );
};
