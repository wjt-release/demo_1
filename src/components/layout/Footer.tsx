import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif font-semibold tracking-tight mb-4">
              ÉLÉGANCE
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              为追求品质生活的现代女性打造的时尚品牌。我们致力于提供优雅、舒适、高品质的女装。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
              购物指南
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  全部商品
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=new"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  新品上市
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=hot"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  热销推荐
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
              客户服务
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  联系我们
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  常见问题
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  配送说明
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  退换货政策
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
              联系方式
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-neutral-400">
                <Mail size={16} />
                <span>service@elegance.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-400">
                <Phone size={16} />
                <span>400-888-8888</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>上海市静安区南京西路1688号</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              © 2024 ÉLÉGANCE. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-neutral-500 hover:text-white transition-colors"
              >
                隐私政策
              </Link>
              <Link
                to="/terms"
                className="text-sm text-neutral-500 hover:text-white transition-colors"
              >
                服务条款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
