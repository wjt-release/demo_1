import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold tracking-widest uppercase mb-4">Aura</h3>
            <p className="text-sm text-gray-500 mb-4">
              简约现代，重新定义时尚。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">购物指南</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/products" className="hover:text-black transition-colors">所有商品</Link></li>
              <li><Link to="/products?category=new" className="hover:text-black transition-colors">新品推荐</Link></li>
              <li><Link to="/products?category=sale" className="hover:text-black transition-colors">折扣专区</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">客户服务</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/contact" className="hover:text-black transition-colors">联系我们</Link></li>
              <li><Link to="/faq" className="hover:text-black transition-colors">常见问题</Link></li>
              <li><Link to="/returns" className="hover:text-black transition-colors">退换货政策</Link></li>
              <li><Link to="/shipping" className="hover:text-black transition-colors">配送信息</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">订阅我们</h4>
            <p className="text-sm text-gray-500 mb-4">
              订阅以获取最新资讯和独家优惠。
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="您的邮箱地址"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
              />
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide"
              >
                订阅
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Aura Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
