import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Heart,
  LogOut,
  Package,
  Settings,
} from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useCartStore } from '../../stores/useCartStore'
import { Button } from '../common/Button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  const itemCount = useCartStore((state) => state.getItemCount())

  const navLinks = [
    { path: '/products', label: '全部商品' },
    { path: '/products?category=new', label: '新品上市' },
    { path: '/products?category=dresses', label: '连衣裙' },
    { path: '/products?category=outerwear', label: '外套' },
    { path: '/products?category=tops', label: '上装' },
  ]

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(true)}
            aria-label="打开菜单"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <h1 className="text-2xl md:text-3xl font-display font-semibold tracking-wider">
              LUXE
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-body transition-colors hover:text-black ${
                  location.pathname + location.search === link.path
                    ? 'text-black font-medium'
                    : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 transition-colors" aria-label="搜索">
              <Search className="w-5 h-5" />
            </button>
            
            <Link 
              to="/wishlist" 
              className="hidden md:block p-2 hover:bg-gray-100 transition-colors"
              aria-label="收藏夹"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link to="/cart" className="relative p-2 hover:bg-gray-100 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-small flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    className="p-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-label="用户菜单"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-body font-medium truncate">{user?.nickname}</p>
                          <p className="text-small text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <div className="py-2">
                          <Link
                            to="/orders"
                            className="flex items-center px-4 py-2 text-body hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Package className="w-4 h-4 mr-3" />
                            我的订单
                          </Link>
                          <Link
                            to="/account"
                            className="flex items-center px-4 py-2 text-body hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            账户设置
                          </Link>
                          <button
                            className="flex items-center w-full px-4 py-2 text-body hover:bg-gray-50 text-left"
                            onClick={handleLogout}
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            退出登录
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block text-body hover:text-black transition-colors"
                >
                  登录
                </Link>
              )}
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
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-h3 font-medium">菜单</h2>
                <button onClick={() => setIsMenuOpen(false)} aria-label="关闭菜单">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block py-3 text-body border-b border-gray-100 hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  className="block py-3 text-body border-b border-gray-100 hover:text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  收藏夹
                </Link>
                <Link
                  to="/contact"
                  className="block py-3 text-body border-b border-gray-100 hover:text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  联系我们
                </Link>
              </nav>
              {!isAuthenticated && (
                <div className="p-4 border-t border-gray-200">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      setIsMenuOpen(false)
                      navigate('/login')
                    }}
                  >
                    登录 / 注册
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
