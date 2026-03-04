import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-black text-white">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl tracking-wider">LUMIÈRE</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              LUMIÈRE 致力于为现代女性提供优雅、时尚的高品质服装，让每一位女性都能找到属于自己的风格。
            </p>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">快速链接</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-sm text-gray-400 hover:text-white transition-colors">
                  全部商品
                </Link>
              </li>
              <li>
                <Link to="/products?category=new" className="text-sm text-gray-400 hover:text-white transition-colors">
                  新品上市
                </Link>
              </li>
              <li>
                <Link to="/products?category=sale" className="text-sm text-gray-400 hover:text-white transition-colors">
                  限时特惠
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-sm text-gray-400 hover:text-white transition-colors">
                  订单查询
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">客户服务</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <span className="text-sm text-gray-400">配送说明</span>
              </li>
              <li>
                <span className="text-sm text-gray-400">退换货政策</span>
              </li>
              <li>
                <span className="text-sm text-gray-400">尺码指南</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">联系方式</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-400">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span>service@lumiere.com</span>
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>400-888-8888</span>
              </li>
              <li className="flex items-start text-sm text-gray-400">
                <MapPin size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>上海市静安区南京西路1688号</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {currentYear} LUMIÈRE. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <span className="text-sm text-gray-500 hover:text-gray-400 cursor-pointer">
                隐私政策
              </span>
              <span className="text-sm text-gray-500 hover:text-gray-400 cursor-pointer">
                使用条款
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
