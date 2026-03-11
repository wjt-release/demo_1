import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { categories } from '@/data/categories';

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="font-display text-2xl font-semibold mb-6">ÉLÉGANCE</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              致力于为现代女性提供高品质、时尚优雅的服装单品，让每一位女性都能找到属于自己的风格。
            </p>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6">商品分类</h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.id}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6">客户服务</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/orders"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  订单查询
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  联系客服
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  我的收藏
                </Link>
              </li>
              <li>
                <Link
                  to="/coupons"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  优惠券
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6">联系我们</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>400-888-8888</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>service@elegance.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>上海市静安区南京西路1788号</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 ÉLÉGANCE. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">
              隐私政策
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              服务条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
