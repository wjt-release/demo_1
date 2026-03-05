import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

export function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">尺码</span>
        {selectedSize && (
          <span className="text-sm text-gray-500">已选: {selectedSize}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={cn(
              'min-w-[48px] px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200',
              selectedSize === size
                ? 'border-black bg-black text-white'
                : 'border-gray-200 hover:border-gray-400'
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
