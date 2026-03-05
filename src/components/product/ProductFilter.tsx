import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { categories } from '@/data';

interface ProductFilterProps {
  selectedCategory: string;
  selectedPriceRange: string;
  selectedSize: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: string) => void;
  onSizeChange: (size: string) => void;
  onClearFilters: () => void;
}

const priceRanges = [
  { value: 'all', label: '全部价格' },
  { value: '0-300', label: '¥300以下' },
  { value: '300-500', label: '¥300-500' },
  { value: '500-1000', label: '¥500-1000' },
  { value: '1000+', label: '¥1000以上' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const ProductFilter = ({
  selectedCategory,
  selectedPriceRange,
  selectedSize,
  onCategoryChange,
  onPriceRangeChange,
  onSizeChange,
  onClearFilters,
}: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('category');

  const hasFilters = selectedCategory !== 'all' || selectedPriceRange !== 'all' || selectedSize !== 'all';

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-sm font-medium text-neutral-900">分类</span>
          <ChevronDown
            size={16}
            className={`text-neutral-400 transition-transform ${
              expandedSection === 'category' ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {expandedSection === 'category' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.slug)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      selectedCategory === category.slug
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-sm font-medium text-neutral-900">价格区间</span>
          <ChevronDown
            size={16}
            className={`text-neutral-400 transition-transform ${
              expandedSection === 'price' ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {expandedSection === 'price' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-3">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => onPriceRangeChange(range.value)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      selectedPriceRange === range.value
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-sm font-medium text-neutral-900">尺码</span>
          <ChevronDown
            size={16}
            className={`text-neutral-400 transition-transform ${
              expandedSection === 'size' ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {expandedSection === 'size' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-3">
                <button
                  onClick={() => onSizeChange('all')}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    selectedSize === 'all'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  全部尺码
                </button>
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => onSizeChange(size)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      selectedSize === size
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          <X size={14} />
          清除筛选
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-lg border border-neutral-100 p-6">
          <h3 className="text-base font-medium text-neutral-900 mb-4">筛选</h3>
          <FilterContent />
        </div>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-md text-sm"
        >
          <SlidersHorizontal size={16} />
          筛选
          {hasFilters && (
            <span className="w-5 h-5 flex items-center justify-center bg-neutral-900 text-white text-xs rounded-full">
              {[selectedCategory !== 'all', selectedPriceRange !== 'all', selectedSize !== 'all'].filter(Boolean).length}
            </span>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 overflow-y-auto"
              >
                <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                  <h3 className="text-base font-medium">筛选</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-neutral-400 hover:text-neutral-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4">
                  <FilterContent />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductFilter;
