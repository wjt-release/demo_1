import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Popup } from '../components/common/Popup';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

const HeroSection = () => (
  <section className="relative h-[80vh] bg-gray-100 overflow-hidden">
    <div className="absolute inset-0 bg-black/10 z-10" />
    <img 
      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
      alt="Hero Fashion" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-white space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">NEW COLLECTION</h1>
        <p className="text-xl md:text-2xl font-light">Spring / Summer 2026</p>
        <Link 
          to="/shop" 
          className="inline-block bg-white text-black px-8 py-3 text-sm font-medium tracking-widest hover:bg-gray-200 transition-colors mt-8"
        >
          SHOP NOW
        </Link>
      </motion.div>
    </div>
  </section>
);

const CategorySection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/shop" className="relative h-[600px] group overflow-hidden cursor-pointer block">
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
            alt="Women" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/50 to-transparent">
            <h3 className="text-white text-3xl font-bold">WOMEN</h3>
          </div>
        </Link>
        <Link to="/shop" className="relative h-[600px] group overflow-hidden cursor-pointer block">
          <img 
            src="https://images.unsplash.com/photo-1550614000-4b9519e02a48?q=80&w=1000&auto=format&fit=crop" 
            alt="Accessories" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/50 to-transparent">
            <h3 className="text-white text-3xl font-bold">ACCESSORIES</h3>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

const NewArrivalsSection = () => {
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">NEW ARRIVALS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop" className="inline-block border-b border-black pb-1 text-sm font-medium hover:text-gray-600 transition-colors">
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
};

export const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <NewArrivalsSection />
      <CategorySection />
      <Popup />
    </div>
  );
};
