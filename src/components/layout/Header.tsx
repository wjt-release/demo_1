import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useUserStore } from '../../store/useUserStore';
import { cn } from '../../lib/utils';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.count());
  const { isAuthenticated, logout } = useUserStore();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 -ml-2 text-gray-900"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-widest text-black uppercase">
          Aura
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors uppercase tracking-wide">
            首页
          </Link>
          <Link to="/products" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors uppercase tracking-wide">
            全部商品
          </Link>
          <Link to="/products?category=new" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors uppercase tracking-wide">
            新品推荐
          </Link>
          <Link to="/contact" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors uppercase tracking-wide">
            联系我们
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-900 hover:text-gray-600 transition-colors">
            <Search size={20} />
          </button>
          <button 
            onClick={handleUserClick}
            className="p-2 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <User size={20} />
          </button>
          <Link to="/cart" className="p-2 text-gray-900 hover:text-gray-600 transition-colors relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-black rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out lg:hidden pt-20 px-6",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <Link 
            to="/" 
            className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            首页
          </Link>
          <Link 
            to="/products" 
            className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            全部商品
          </Link>
          <Link 
            to="/products?category=new" 
            className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            新品推荐
          </Link>
          <Link 
            to="/contact" 
            className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            联系我们
          </Link>
          {isAuthenticated ? (
            <button 
              className="text-lg font-medium text-left text-gray-900 border-b border-gray-100 pb-2"
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
            >
              退出登录
            </button>
          ) : (
            <Link 
              to="/login" 
              className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              登录 / 注册
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
