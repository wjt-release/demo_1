import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { useAuthStore, useCartStore } from '@/stores';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -ml-2 md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="font-serif text-2xl font-bold tracking-wider">
            ÉLÉGANCE
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-gray-600 transition-colors">
              首页
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-gray-600 transition-colors">
              全部商品
            </Link>
            <Link to="/products?category=new" className="text-sm font-medium hover:text-gray-600 transition-colors">
              新品上市
            </Link>
            <Link to="/products?category=sale" className="text-sm font-medium hover:text-gray-600 transition-colors">
              限时特惠
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>

            <Link
              to={isAuthenticated ? '/orders' : '/login'}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User size={20} />
            </Link>

            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-white"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索商品..."
                  className="w-full px-4 py-3 pl-12 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                />
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <nav className="px-4 py-4 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 font-medium"
              >
                首页
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 font-medium"
              >
                全部商品
              </Link>
              <Link
                to="/products?category=new"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 font-medium"
              >
                新品上市
              </Link>
              <Link
                to="/products?category=sale"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 font-medium"
              >
                限时特惠
              </Link>
              <div className="border-t border-gray-100 pt-4">
                {isAuthenticated ? (
                  <>
                    <div className="py-2 text-sm text-gray-600">
                      你好，{user?.name}
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 font-medium"
                    >
                      我的订单
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block py-2 font-medium text-left w-full"
                    >
                      退出登录
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 font-medium"
                  >
                    登录 / 注册
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
