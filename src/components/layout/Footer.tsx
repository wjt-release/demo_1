import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold tracking-wider mb-4">
              ÉLÉGANCE
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              专注于为现代都市女性提供简约优雅的时尚单品，让每一位女性都能找到属于自己的风格。
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">购物指南</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  全部商品
                </Link>
              </li>
              <li>
                <Link to="/products?category=new" className="hover:text-white transition-colors">
                  新品上市
                </Link>
              </li>
              <li>
                <Link to="/products?category=sale" className="hover:text-white transition-colors">
                  限时特惠
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">客户服务</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  订单查询
                </Link>
              </li>
              <li>
                <span className="cursor-default">配送说明</span>
              </li>
              <li>
                <span className="cursor-default">退换货政策</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">联系方式</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>service@elegance.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>400-888-8888</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>上海市静安区南京西路1688号</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2024 ÉLÉGANCE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
