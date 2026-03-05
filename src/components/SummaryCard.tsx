import { TrendingUp, TrendingDown, Users, Target, DollarSign } from 'lucide-react';
import { chartColors } from '@/data/mockData';

interface SummaryCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: 'users' | 'target' | 'dollar';
  index: number;
}

const iconMap = {
  users: Users,
  target: Target,
  dollar: DollarSign,
};

const iconColorMap = {
  users: chartColors.primary,
  target: chartColors.secondary,
  dollar: chartColors.quaternary,
};

export default function SummaryCard({ title, value, trend, icon, index }: SummaryCardProps) {
  const Icon = iconMap[icon];
  const iconColor = iconColorMap[icon];
  const isPositive = trend >= 0;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-[#2d3548] bg-[#242938] p-6 transition-all duration-300 hover:border-[#3d4558] hover:bg-[#2a3142] hover:shadow-lg hover:shadow-black/20"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.5s ease-out forwards',
        opacity: 0,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#94a3b8]">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#f1f5f9]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-[#00d4aa]" />
            ) : (
              <TrendingDown className="h-4 w-4 text-[#ff6b35]" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-[#00d4aa]' : 'text-[#ff6b35]'}`}>
              {isPositive ? '+' : ''}{trend}%
            </span>
            <span className="text-xs text-[#64748b]">vs 上月</span>
          </div>
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon className="h-6 w-6" style={{ color: iconColor }} />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 w-full transition-all duration-300 group-hover:h-1.5"
        style={{
          background: `linear-gradient(90deg, ${iconColor} 0%, transparent 100%)`,
          opacity: 0.5,
        }}
      />
    </div>
  );
}
