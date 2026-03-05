import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { categories } from '@/data';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { totalItems } = useCartStore();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <button
              className="md:hidden p-2 -ml-2 text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-neutral-900">
                ÉLÉGANCE
              </h1>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className={`text-sm font-medium transition-colors ${
                    isActive(`/products?category=${category.slug}`)
                      ? 'text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
              <Search size={20} />
            </button>

            <Link
              to="/favorites"
              className="hidden md:flex p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <Heart size={20} />
            </Link>

            <Link
              to="/cart"
              className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-neutral-900 text-white text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User size={20} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-100 py-2"
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="text-sm font-medium text-neutral-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {user?.email}
                          </p>
                        </div>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          我的订单
                        </Link>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          个人中心
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                        >
                          <LogOut size={16} />
                          退出登录
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          登录 / 注册
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <h2 className="text-lg font-medium">菜单</h2>
                <button
                  className="p-2 text-neutral-600 hover:text-neutral-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="p-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.slug}`}
                    className="block py-3 text-base text-neutral-600 hover:text-neutral-900 border-b border-neutral-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
