import { Star, Clock, MapPin, X } from 'lucide-react';
import { DeliveryFilters } from '@/store/deliveryStore';

interface MerchantFilterProps {
  filters: DeliveryFilters;
  onFilterChange: (filters: Partial<DeliveryFilters>) => void;
  onReset: () => void;
}

export function MerchantFilter({ filters, onFilterChange, onReset }: MerchantFilterProps) {
  const hasActiveFilters = filters.rating || filters.deliveryTime || filters.area;

  return (
    <div className="bg-white p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-primary">筛选商家</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
          >
            <X className="w-4 h-4" />
            清除筛选
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">评分</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[4.5, 4.7, 4.9].map((rating) => (
              <button
                key={rating}
                onClick={() => onFilterChange({ rating: filters.rating === rating ? null : rating })}
                className={`px-3 py-1.5 text-sm border transition-colors ${
                  filters.rating === rating
                    ? 'border-[#0066FF] bg-[#0066FF] text-white'
                    : 'border-gray-200 hover:border-[#0066FF]'
                }`}
              >
                {rating}分以上
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-[#0066FF]" />
            <span className="text-sm text-gray-600">配送时间</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 6, label: '6小时内' },
              { value: 24, label: '24小时内' },
              { value: 48, label: '48小时内' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange({ deliveryTime: filters.deliveryTime === option.value ? null : option.value })}
                className={`px-3 py-1.5 text-sm border transition-colors ${
                  filters.deliveryTime === option.value
                    ? 'border-[#0066FF] bg-[#0066FF] text-white'
                    : 'border-gray-200 hover:border-[#0066FF]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#0066FF]" />
            <span className="text-sm text-gray-600">配送区域</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['北京', '上海', '广州', '深圳', '全国'].map((area) => (
              <button
                key={area}
                onClick={() => onFilterChange({ area: filters.area === area ? null : area })}
                className={`px-3 py-1.5 text-sm border transition-colors ${
                  filters.area === area
                    ? 'border-[#0066FF] bg-[#0066FF] text-white'
                    : 'border-gray-200 hover:border-[#0066FF]'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
