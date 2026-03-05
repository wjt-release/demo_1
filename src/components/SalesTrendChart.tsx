import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { salesTrendData, chartColors } from '@/data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SalesTrendChart() {
  const data = {
    labels: salesTrendData.map(d => d.date),
    datasets: [
      {
        label: '销售额',
        data: salesTrendData.map(d => d.sales),
        borderColor: chartColors.primary,
        backgroundColor: (context: { chart: ChartJS; dataIndex: number }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 280);
          gradient.addColorStop(0, 'rgba(0, 212, 170, 0.25)');
          gradient.addColorStop(1, 'rgba(0, 212, 170, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: chartColors.primary,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: '订单量',
        data: salesTrendData.map(d => d.orders * 100),
        borderColor: chartColors.secondary,
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: chartColors.secondary,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: chartColors.textMuted,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        titleFont: {
          family: 'Space Grotesk, sans-serif',
          size: 13,
          weight: 600,
        },
        bodyFont: {
          family: 'JetBrains Mono, monospace',
          size: 12,
        },
        callbacks: {
          label: function(context) {
            if (context.datasetIndex === 0) {
              return ` 销售额: ¥${context.raw?.toLocaleString()}`;
            }
            return ` 订单量: ${(Number(context.raw) / 100).toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(45, 53, 72, 0.5)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: chartColors.textMuted,
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(45, 53, 72, 0.5)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: chartColors.textMuted,
          font: {
            family: 'JetBrains Mono, monospace',
            size: 11,
          },
          callback: function(value) {
            return '¥' + (Number(value) / 1000).toFixed(0) + 'k';
          },
        },
      },
    },
  };

  return (
    <div
      className="rounded-2xl border border-[#2d3548] bg-[#242938] p-6 transition-all duration-300 hover:border-[#3d4558]"
      style={{
        animation: 'fadeInUp 0.5s ease-out forwards',
        animationDelay: '300ms',
        opacity: 0,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#f1f5f9]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            销售趋势
          </h3>
          <p className="mt-1 text-sm text-[#64748b]">近30天销售数据变化</p>
        </div>
      </div>
      <div className="h-[280px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
