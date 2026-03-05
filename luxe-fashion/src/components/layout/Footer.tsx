import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">LUXE</h3>
            <p className="text-gray-400 text-body leading-relaxed">
              专注于为现代女性提供高品质时尚单品，打造简约优雅的穿搭风格。
            </p>
          </div>

          <div>
            <h4 className="text-body font-medium mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-body">
                  全部商品
                </Link>
              </li>
              <li>
                <Link to="/products?category=new" className="text-gray-400 hover:text-white transition-colors text-body">
                  新品上市
                </Link>
              </li>
              <li>
                <Link to="/products?sale=true" className="text-gray-400 hover:text-white transition-colors text-body">
                  特惠专区
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-white transition-colors text-body">
                  收藏夹
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-body font-medium mb-4">客户服务</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-body">
                  联系我们
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-body">
                  配送说明
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-body">
                  退换货政策
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-body">
                  尺码指南
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-body font-medium mb-4">联系方式</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 text-body">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>service@luxe.com</span>
              </li>
              <li className="flex items-center text-gray-400 text-body">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>400-888-8888</span>
              </li>
              <li className="flex items-start text-gray-400 text-body">
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0 mt-0.5" />
                <span>上海市静安区南京西路1788号</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-small text-gray-500">
              © 2024 LUXE. 保留所有权利。
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-small text-gray-500 hover:text-white transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-small text-gray-500 hover:text-white transition-colors">
                服务条款
              </a>
              <a href="#" className="text-small text-gray-500 hover:text-white transition-colors">
                Cookie设置
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
