export const summaryData = {
  userCount: 12450,
  conversionRate: 3.2,
  dailyRevenue: 4500,
  userCountTrend: 5.4, // percentage
  conversionRateTrend: -1.2,
  dailyRevenueTrend: 8.7,
};

export const salesTrendData = {
  labels: Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }),
  datasets: [
    {
      label: 'Sales (¥)',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5000) + 2000),
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgba(59, 130, 246, 1)',
      tension: 0.4,
    },
  ],
};

export const regionalData = {
  labels: ['广东', '北京', '上海', '浙江', '江苏', '其他'],
  datasets: [
    {
      label: 'Sales Distribution',
      data: [35, 20, 15, 12, 10, 8],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(107, 114, 128, 0.8)',
      ],
      borderWidth: 1,
    },
  ],
};

export const activityHeatmapData = Array.from({ length: 7 }, (_, dayIndex) =>
  Array.from({ length: 24 }, (_, hourIndex) => ({
    day: dayIndex, // 0-6 (Sun-Sat)
    hour: hourIndex, // 0-23
    value: Math.floor(Math.random() * 100),
  }))
);

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const hours = Array.from({ length: 24 }, (_, i) => i);
