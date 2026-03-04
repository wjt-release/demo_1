import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search, Heart } from 'lucide-react';
import { useCartStore, useUserStore } from '../../stores';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const itemCount = useCartStore(state => state.getItemCount());
  const { isLoggedIn, user } = useUserStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/products', label: '全部商品' },
    { path: '/products?category=new', label: '新品上市' },
    { path: '/products?category=sale', label: '限时特惠' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center">
            <span className="font-display text-2xl lg:text-3xl tracking-wider text-primary-black">
              LUMIÈRE
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-black font-medium'
                    : 'text-primary-gray hover:text-primary-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4 lg:space-x-6">
            <button className="hidden lg:block text-primary-gray hover:text-primary-black transition-colors">
              <Search size={20} />
            </button>

            <Link
              to="/orders"
              className="hidden lg:block text-primary-gray hover:text-primary-black transition-colors"
            >
              <Heart size={20} />
            </Link>

            {isLoggedIn ? (
              <Link
                to="/orders"
                className="hidden lg:flex items-center text-sm text-primary-gray hover:text-primary-black transition-colors"
              >
                <User size={20} className="mr-1" />
                <span className="max-w-20 truncate">{user?.name}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden lg:block text-sm text-primary-gray hover:text-primary-black transition-colors"
              >
                登录
              </Link>
            )}

            <Link to="/cart" className="relative text-primary-gray hover:text-primary-black transition-colors">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-black text-white text-xs rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden text-primary-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <nav className="container-custom py-4 space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-base ${
                    location.pathname === link.path
                      ? 'text-primary-black font-medium'
                      : 'text-primary-gray'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <Link to="/orders" className="block text-base text-primary-gray">
                      我的订单
                    </Link>
                    <Link to="/contact" className="block text-base text-primary-gray">
                      联系我们
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link to="/login" className="block text-base text-primary-gray">
                      登录
                    </Link>
                    <Link to="/register" className="block text-base text-primary-gray">
                      注册
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
