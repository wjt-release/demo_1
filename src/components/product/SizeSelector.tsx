import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { Product } from '@/types';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
  stock?: number;
}

const SizeSelector = ({ sizes, selectedSize, onSelect, stock = 10 }: SizeSelectorProps) => {
  const getStockStatus = (size: string) => {
    const sizeIndex = sizes.indexOf(size);
    if (sizeIndex === -1) return 'available';
    const sizeStock = Math.max(0, stock - sizeIndex * 5);
    if (sizeStock === 0) return 'out';
    if (sizeStock < 5) return 'low';
    return 'available';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-900">尺码选择</span>
        <button className="text-sm text-neutral-500 hover:text-neutral-700 underline underline-offset-2">
          尺码指南
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const stockStatus = getStockStatus(size);
          const isSelected = selectedSize === size;
          const isDisabled = stockStatus === 'out';

          return (
            <motion.button
              key={size}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              onClick={() => !isDisabled && onSelect(size)}
              disabled={isDisabled}
              className={clsx(
                'relative min-w-[48px] h-12 px-3 text-sm font-medium rounded-md border transition-all',
                isSelected
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : isDisabled
                  ? 'border-neutral-200 bg-neutral-50 text-neutral-300 cursor-not-allowed'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
              )}
            >
              {size}
              {stockStatus === 'low' && !isSelected && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedSize && (
        <p className="text-sm text-neutral-500">
          {getStockStatus(selectedSize) === 'low'
            ? '库存紧张，请尽快下单'
            : '有货'}
        </p>
      )}
    </div>
  );
};

export default SizeSelector;
