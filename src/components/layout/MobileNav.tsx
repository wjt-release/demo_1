import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';

const MobileNav = () => {
  const location = useLocation();
  const { totalItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/products', icon: Search, label: '探索' },
    { path: '/favorites', icon: Heart, label: '收藏' },
    { path: '/cart', icon: ShoppingBag, label: '购物车', badge: totalItems },
    { path: isAuthenticated ? '/orders' : '/login', icon: User, label: '我的' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/products') return location.pathname.startsWith('/products');
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 md:hidden z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center flex-1 h-full"
            >
              <div className="relative">
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -inset-2 bg-neutral-100 rounded-lg"
                    transition={{ type: 'spring', duration: 0.3 }}
                  />
                )}
                <div className="relative p-2">
                  <Icon
                    size={22}
                    className={active ? 'text-neutral-900' : 'text-neutral-400'}
                  />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-neutral-900 text-white text-xs rounded-full">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`text-xs mt-0.5 ${
                  active ? 'text-neutral-900 font-medium' : 'text-neutral-400'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
