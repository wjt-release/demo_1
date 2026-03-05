import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, User, Package } from 'lucide-react';
import { useAuthStore, useCartStore } from '@/stores';

export function BottomNav() {
  const { isAuthenticated } = useAuthStore();
  const { getTotalItems } = useCartStore();

  const navItems = [
    { to: '/', icon: Home, label: '首页' },
    { to: '/products', icon: ShoppingBag, label: '商品' },
    { to: '/cart', icon: ShoppingBag, label: '购物车', badge: getTotalItems() },
    { to: isAuthenticated ? '/orders' : '/login', icon: User, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full relative ${
                isActive ? 'text-black' : 'text-gray-400'
              }`
            }
          >
            <item.icon size={22} />
            <span className="text-xs mt-1">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="absolute top-1 right-1/4 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
