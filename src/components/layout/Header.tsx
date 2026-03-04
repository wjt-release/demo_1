import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          LUMINA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-black transition-colors">HOME</Link>
          <Link to="/shop" className="hover:text-black transition-colors">NEW ARRIVALS</Link>
          <Link to="/shop?sort=best" className="hover:text-black transition-colors">BEST SELLERS</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User size={20} />
          </Link>
          <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-4 text-sm font-medium">
              <Link to="/" className="block py-2" onClick={() => setIsMenuOpen(false)}>HOME</Link>
              <Link to="/shop" className="block py-2" onClick={() => setIsMenuOpen(false)}>NEW ARRIVALS</Link>
              <Link to="/shop?sort=best" className="block py-2" onClick={() => setIsMenuOpen(false)}>BEST SELLERS</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
