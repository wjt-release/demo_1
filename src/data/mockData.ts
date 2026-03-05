export const summaryMetrics = {
  totalUsers: 128459,
  conversionRate: 3.42,
  dailyRevenue: 89234,
  userTrend: 12.5,
  conversionTrend: -2.3,
  revenueTrend: 8.7,
};

export const salesTrendData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
    sales: Math.floor(Math.random() * 50000) + 30000,
    orders: Math.floor(Math.random() * 500) + 200,
  };
});

export const regionDistribution = [
  { province: '广东', value: 28500, percentage: 22.8 },
  { province: '江苏', value: 21200, percentage: 17.0 },
  { province: '浙江', value: 18900, percentage: 15.1 },
  { province: '北京', value: 15600, percentage: 12.5 },
  { province: '上海', value: 14200, percentage: 11.4 },
  { province: '山东', value: 10800, percentage: 8.6 },
  { province: '四川', value: 9500, percentage: 7.6 },
  { province: '其他', value: 6259, percentage: 5.0 },
];

export const activityHeatmapData = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => ({
    day,
    hour,
    value: Math.floor(Math.random() * 100),
  }))
).flat();

export const chartColors = {
  primary: '#00d4aa',
  secondary: '#ff6b35',
  tertiary: '#6366f1',
  quaternary: '#f59e0b',
  quinary: '#ec4899',
  senary: '#8b5cf6',
  background: '#1a1f2e',
  card: '#242938',
  cardHover: '#2a3142',
  border: '#2d3548',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  gradientStart: 'rgba(0, 212, 170, 0.3)',
  gradientEnd: 'rgba(0, 212, 170, 0.0)',
};

export const pieChartColors = [
  '#00d4aa',
  '#ff6b35',
  '#6366f1',
  '#f59e0b',
  '#ec4899',
  '#8b5cf6',
  '#14b8a6',
  '#64748b',
];
