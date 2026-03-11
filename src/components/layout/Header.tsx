import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search, Heart } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/common';
import { categories } from '@/data/categories';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const { showMobileMenu, toggleMobileMenu, closeMobileMenu, toggleCartDrawer } = useUIStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const itemCount = getItemCount();

  const navLinks = [
    { path: '/products', label: '全部商品' },
    { path: '/products?category=new', label: '新品上市' },
    { path: '/products?category=hot', label: '热销推荐' },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/" className="font-display text-2xl md:text-3xl font-semibold tracking-wide">
            ÉLÉGANCE
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname + location.search === link.path
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link
              to="/favorites"
              className="hidden md:block p-2 text-gray-500 hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <button
              onClick={toggleCartDrawer}
              className="relative p-2 text-gray-500 hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 text-gray-500 hover:text-primary transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                >
                  登录
                </Link>
              )}

              <AnimatePresence>
                {showUserMenu && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white shadow-medium border border-gray-100 py-2"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-primary">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      我的订单
                    </Link>
                    <Link
                      to="/account"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      个人中心
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      退出登录
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-16 left-0 bottom-0 w-72 bg-white z-50 md:hidden overflow-y-auto"
            >
              <nav className="py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className="block px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <p className="px-6 py-2 text-xs font-medium text-gray-400 uppercase">分类</p>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/products?category=${category.id}`}
                      onClick={closeMobileMenu}
                      className="block px-6 py-3 text-base text-gray-600 hover:bg-gray-50"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                {!isAuthenticated && (
                  <div className="border-t border-gray-100 mt-4 pt-4 px-6">
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => {
                        closeMobileMenu();
                        navigate('/login');
                      }}
                    >
                      登录 / 注册
                    </Button>
                  </div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
