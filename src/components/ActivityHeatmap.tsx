import { activityHeatmapData, chartColors } from '@/data/mockData';

const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const hours = Array.from({ length: 24 }, (_, i) => i);

function getColorIntensity(value: number): string {
  const intensity = value / 100;
  if (intensity < 0.2) return 'rgba(0, 212, 170, 0.1)';
  if (intensity < 0.4) return 'rgba(0, 212, 170, 0.3)';
  if (intensity < 0.6) return 'rgba(0, 212, 170, 0.5)';
  if (intensity < 0.8) return 'rgba(0, 212, 170, 0.7)';
  return 'rgba(0, 212, 170, 0.9)';
}

export default function ActivityHeatmap() {
  const getCellValue = (day: number, hour: number) => {
    const cell = activityHeatmapData.find(d => d.day === day && d.hour === hour);
    return cell?.value ?? 0;
  };

  return (
    <div
      className="rounded-2xl border border-[#2d3548] bg-[#242938] p-6 transition-all duration-300 hover:border-[#3d4558]"
      style={{
        animation: 'fadeInUp 0.5s ease-out forwards',
        animationDelay: '500ms',
        opacity: 0,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#f1f5f9]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            用户活跃度
          </h3>
          <p className="mt-1 text-sm text-[#64748b]">按日期和小时分布的热力图</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748b]">低</span>
          <div className="flex gap-0.5">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((opacity, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: `rgba(0, 212, 170, ${opacity})` }}
              />
            ))}
          </div>
          <span className="text-xs text-[#64748b]">高</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="flex">
            <div className="w-12 flex-shrink-0" />
            <div className="flex-1 grid grid-cols-24 gap-0.5">
              {hours.map(hour => (
                <div
                  key={hour}
                  className="text-center text-[10px] text-[#64748b]"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {hour % 6 === 0 ? hour : ''}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-1 space-y-0.5">
            {days.map((day, dayIndex) => (
              <div key={day} className="flex items-center">
                <div className="w-12 flex-shrink-0 text-xs text-[#94a3b8] pr-2 text-right">
                  {day}
                </div>
                <div className="flex-1 grid grid-cols-24 gap-0.5">
                  {hours.map(hour => {
                    const value = getCellValue(dayIndex, hour);
                    return (
                      <div
                        key={hour}
                        className="h-5 rounded-sm transition-all duration-200 hover:ring-1 hover:ring-white/30 cursor-pointer group relative"
                        style={{ backgroundColor: getColorIntensity(value) }}
                        title={`${day} ${hour}:00 - 活跃度: ${value}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
