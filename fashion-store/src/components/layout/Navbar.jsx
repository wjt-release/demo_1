import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCartStore, useUserStore, useUIStore } from '../../store/useStore';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const { user, logout } = useUserStore();
  const toggleCart = useUIStore((state) => state.toggleCart);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto md:justify-start absolute md:relative left-0 right-0 pointer-events-none md:pointer-events-auto">
            <Link to="/" className="text-2xl font-bold tracking-widest uppercase pointer-events-auto">
              MODERN
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center justify-center flex-1">
            <Link to="/shop?category=new" className="text-sm uppercase tracking-wider hover:text-zinc-500 transition-colors">New Arrivals</Link>
            <Link to="/shop" className="text-sm uppercase tracking-wider hover:text-zinc-500 transition-colors">Clothing</Link>
            <Link to="/shop?category=accessories" className="text-sm uppercase tracking-wider hover:text-zinc-500 transition-colors">Accessories</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-black hover:text-zinc-600 transition-colors hidden sm:block">
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            {user ? (
              <div className="relative group">
                <Link to="/profile" className="text-black hover:text-zinc-600 transition-colors block p-1">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              </div>
            ) : (
              <Link to="/login" className="text-black hover:text-zinc-600 transition-colors">
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}

            <button onClick={toggleCart} className="text-black hover:text-zinc-600 transition-colors relative p-1">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 absolute w-full left-0 h-screen z-40 p-4 animate-in slide-in-from-left-5">
          <div className="flex flex-col space-y-4 mt-4">
            <Link to="/shop?category=new" className="text-lg uppercase tracking-wider py-2 border-b border-zinc-50" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
            <Link to="/shop" className="text-lg uppercase tracking-wider py-2 border-b border-zinc-50" onClick={() => setIsMobileMenuOpen(false)}>Clothing</Link>
            <Link to="/shop?category=accessories" className="text-lg uppercase tracking-wider py-2 border-b border-zinc-50" onClick={() => setIsMobileMenuOpen(false)}>Accessories</Link>
            {!user && (
              <Link to="/login" className="text-lg uppercase tracking-wider py-2 border-b border-zinc-50" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
            )}
            {user && (
              <Link to="/profile" className="text-lg uppercase tracking-wider py-2 border-b border-zinc-50" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
