import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { regionDistribution, pieChartColors, chartColors } from '@/data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RegionPieChart() {
  const data = {
    labels: regionDistribution.map(d => d.province),
    datasets: [
      {
        data: regionDistribution.map(d => d.value),
        backgroundColor: pieChartColors,
        borderColor: chartColors.card,
        borderWidth: 2,
        hoverOffset: 8,
        hoverBorderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
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
            const item = regionDistribution[context.dataIndex];
            return ` ¥${item.value.toLocaleString()} (${item.percentage}%)`;
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
        animationDelay: '400ms',
        opacity: 0,
      }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#f1f5f9]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          地区分布
        </h3>
        <p className="mt-1 text-sm text-[#64748b]">各省份销售占比</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="h-[200px] w-full lg:w-[200px] mx-auto lg:mx-0">
          <Pie data={data} options={options} />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3">
          {regionDistribution.map((item, index) => (
            <div
              key={item.province}
              className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-[#2a3142]"
            >
              <div
                className="h-3 w-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: pieChartColors[index] }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#f1f5f9] truncate">{item.province}</p>
                <p className="text-xs text-[#64748b]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {item.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
