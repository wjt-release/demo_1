import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DeliveryMerchant } from '@/types';

interface MerchantCardProps {
  merchant: DeliveryMerchant;
  index?: number;
}

export function MerchantCard({ merchant, index = 0 }: MerchantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/delivery/${merchant.id}`} className="block bg-white hover:shadow-lg transition-shadow">
        <div className="relative h-40 overflow-hidden">
          <img
            src={merchant.coverImage}
            alt={merchant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="flex items-center gap-2">
              <img
                src={merchant.logo}
                alt={merchant.name}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <div>
                <h3 className="text-white font-medium text-sm">{merchant.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs">{merchant.rating}</span>
                  <span className="text-white/60 text-xs">({merchant.reviewCount}条评价)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-500 text-xs line-clamp-2 mb-3">{merchant.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{merchant.deliveryTimeMin}-{merchant.deliveryTimeMax}小时</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{merchant.deliveryAreas.slice(0, 2).join('、')}{merchant.deliveryAreas.length > 2 ? '...' : ''}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {merchant.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#0066FF]/10 text-[#0066FF] text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-xs">起送¥{merchant.minOrderAmount}</span>
              {merchant.deliveryFee === 0 ? (
                <span className="text-xs text-green-500">免运费</span>
              ) : (
                <span className="text-xs">运费¥{merchant.deliveryFee}</span>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center justify-center gap-1 py-2 border border-[#0066FF] text-[#0066FF] text-sm hover:bg-[#0066FF] hover:text-white transition-colors">
            <span>进入商家</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
