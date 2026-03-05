import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Users, Target, DollarSign } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: 'users' | 'target' | 'dollar';
  format?: 'number' | 'percent' | 'currency';
  delay?: number;
}

const iconMap = {
  users: Users,
  target: Target,
  dollar: DollarSign,
};

const gradientMap = {
  users: 'from-cyan-500 to-blue-500',
  target: 'from-emerald-500 to-teal-500',
  dollar: 'from-violet-500 to-purple-500',
};

const bgGradientMap = {
  users: 'from-cyan-500/10 to-blue-500/10',
  target: 'from-emerald-500/10 to-teal-500/10',
  dollar: 'from-violet-500/10 to-purple-500/10',
};

export function MetricCard({ title, value, change, icon, format = 'number', delay = 0 }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const Icon = iconMap[icon];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isVisible, value]);

  const formatValue = (val: number) => {
    switch (format) {
      case 'percent':
        return `${val.toFixed(2)}%`;
      case 'currency':
        return `¥${val.toLocaleString()}`;
      default:
        return val.toLocaleString();
    }
  };

  const isPositive = change >= 0;

  return (
    <div
      className={cn(
        'relative group overflow-hidden rounded-2xl p-6 transition-all duration-500',
        'bg-gradient-to-br backdrop-blur-xl',
        'border border-white/10',
        'hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-500/10',
        'hover:-translate-y-1',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{
        background: `linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9))`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className={cn(
        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
        'bg-gradient-to-br',
        bgGradientMap[icon]
      )} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            'p-3 rounded-xl bg-gradient-to-br',
            gradientMap[icon],
            'shadow-lg'
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={cn(
            'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
            isPositive 
              ? 'bg-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/20 text-rose-400'
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{isPositive ? '+' : ''}{change}%</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white tracking-tight">
            {formatValue(displayValue)}
          </p>
        </div>
      </div>
      
      <div className={cn(
        'absolute -bottom-2 -right-2 w-24 h-24 rounded-full blur-3xl opacity-30',
        'bg-gradient-to-br',
        gradientMap[icon]
      )} />
    </div>
  );
}
