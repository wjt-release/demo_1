import { useEffect, useRef, useState } from 'react';
import { activityHeatmapData } from '@/data/mockData';

export function ActivityHeatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    day: string;
    hour: number;
    value: number;
  }>({ visible: false, x: 0, y: 0, day: '', hour: 0, value: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = containerRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    const padding = { top: 40, right: 20, bottom: 30, left: 50 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;

    const cellWidth = chartWidth / 24;
    const cellHeight = chartHeight / 7;
    const cellPadding = 2;

    ctx.clearRect(0, 0, rect.width, rect.height);

    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    ctx.font = '12px DM Sans';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    days.forEach((day, i) => {
      const y = padding.top + i * cellHeight + cellHeight / 2;
      ctx.fillText(day, padding.left - 10, y);
    });

    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    for (let hour = 0; hour < 24; hour += 3) {
      const x = padding.left + hour * cellWidth + cellWidth / 2;
      ctx.fillText(`${hour}:00`, x, padding.top - 10);
    }

    const maxValue = Math.max(...activityHeatmapData.map(d => d.value));

    activityHeatmapData.forEach((data) => {
      const intensity = data.value / maxValue;
      const x = padding.left + data.hour * cellWidth + cellPadding;
      const y = padding.top + data.day * cellHeight + cellPadding;
      const width = cellWidth - cellPadding * 2;
      const height = cellHeight - cellPadding * 2;

      const r = Math.round(6 + intensity * 0);
      const g = Math.round(182 - intensity * 80);
      const b = Math.round(212 - intensity * 60);
      const alpha = 0.3 + intensity * 0.7;

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, 4);
      ctx.fill();
    });
  }, [isVisible]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = { top: 40, right: 20, bottom: 30, left: 50 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;

    const cellWidth = chartWidth / 24;
    const cellHeight = chartHeight / 7;

    const hour = Math.floor((x - padding.left) / cellWidth);
    const day = Math.floor((y - padding.top) / cellHeight);

    if (hour >= 0 && hour < 24 && day >= 0 && day < 7) {
      const dataPoint = activityHeatmapData.find(d => d.day === day && d.hour === hour);
      if (dataPoint) {
        setTooltip({
          visible: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          day: dataPoint.dayName,
          hour: dataPoint.hour,
          value: dataPoint.value,
        });
        return;
      }
    }

    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <div
      ref={containerRef}
      className="rounded-2xl p-6 transition-all duration-500 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-500/10"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9))',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">用户活跃度</h3>
          <p className="text-sm text-slate-400 mt-1">日-小时分布热力图</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">低</span>
          <div className="flex gap-0.5">
            {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: `rgba(6, 182, 212, ${opacity})`,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">高</span>
        </div>
      </div>
      <div className="relative h-64">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        {tooltip.visible && (
          <div
            className="absolute pointer-events-none px-3 py-2 rounded-lg text-sm z-10"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 40,
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: '#f1f5f9',
            }}
          >
            <div className="font-medium">{tooltip.day} {tooltip.hour}:00</div>
            <div className="text-cyan-400">活跃度: {tooltip.value}</div>
          </div>
        )}
      </div>
    </div>
  );
}
