import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { regionDistribution } from '@/data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

export function RegionPieChart() {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const colors = [
    '#06b6d4',
    '#8b5cf6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#ec4899',
    '#6366f1',
    '#64748b',
  ];

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: isVisible ? 1500 : 0,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#94a3b8',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: {
            size: 12,
            family: 'DM Sans',
          },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i] as number;
                const percentage = regionDistribution[i]?.percentage || 0;
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: colors[i % colors.length],
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(6, 182, 212, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const percentage = regionDistribution[context.dataIndex]?.percentage || 0;
            return `¥${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  const data = {
    labels: regionDistribution.map(d => d.province),
    datasets: [
      {
        data: regionDistribution.map(d => d.value),
        backgroundColor: colors,
        borderColor: 'rgba(15, 23, 42, 0.8)',
        borderWidth: 2,
        hoverBorderColor: '#fff',
        hoverBorderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div
      ref={chartRef}
      className="rounded-2xl p-6 transition-all duration-500 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-500/10"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9))',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">地区分布</h3>
          <p className="text-sm text-slate-400 mt-1">各省份销售占比</p>
        </div>
      </div>
      <div className="h-72">
        <Pie options={options} data={data} />
      </div>
    </div>
  );
}
