import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useUserStore } from '../../store/useUserStore';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleUserClick = () => {
    if (user) {
      navigate('/orders');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          MODA.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-gray-600 transition-colors">HOME</Link>
          <Link to="/products" className="text-sm font-medium hover:text-gray-600 transition-colors">SHOP</Link>
          <Link to="/products?category=new" className="text-sm font-medium hover:text-gray-600 transition-colors">NEW ARRIVALS</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-gray-600 transition-colors">CONTACT</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            onClick={handleUserClick}
          >
            <User size={20} />
            {user && <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></span>}
          </button>
          <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-white px-4 py-6 animate-in slide-in-from-left-10 duration-200 border-t border-gray-100">
          <div className="flex flex-col space-y-6">
            <Link to="/" className="text-lg font-medium border-b border-gray-100 pb-2" onClick={toggleMenu}>HOME</Link>
            <Link to="/products" className="text-lg font-medium border-b border-gray-100 pb-2" onClick={toggleMenu}>SHOP</Link>
            <Link to="/products?category=new" className="text-lg font-medium border-b border-gray-100 pb-2" onClick={toggleMenu}>NEW ARRIVALS</Link>
            <Link to="/contact" className="text-lg font-medium border-b border-gray-100 pb-2" onClick={toggleMenu}>CONTACT</Link>
            {user ? (
              <>
                <Link to="/orders" className="text-lg font-medium border-b border-gray-100 pb-2" onClick={toggleMenu}>MY ORDERS</Link>
                <button 
                  onClick={handleLogout} 
                  className="text-lg font-medium text-left text-red-500 pt-2"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <Link to="/login" className="text-lg font-medium border-b border-gray-100 pb-2" onClick={toggleMenu}>LOGIN / REGISTER</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
