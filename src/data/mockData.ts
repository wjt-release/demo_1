export const summaryMetrics = {
  totalUsers: 128459,
  conversionRate: 3.24,
  dailyRevenue: 89420,
  userGrowth: 12.5,
  conversionChange: 0.8,
  revenueChange: -2.3,
};

export const salesTrendData = (() => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const baseSales = 50000 + Math.random() * 30000;
    const weekendBoost = (date.getDay() === 0 || date.getDay() === 6) ? 1.15 : 1;
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      sales: Math.round(baseSales * weekendBoost),
      orders: Math.round((baseSales * weekendBoost) / 150),
    });
  }
  return data;
})();

export const regionDistribution = [
  { province: '广东省', value: 28500, percentage: 23.5 },
  { province: '江苏省', value: 18200, percentage: 15.0 },
  { province: '浙江省', value: 15800, percentage: 13.0 },
  { province: '山东省', value: 12500, percentage: 10.3 },
  { province: '河南省', value: 9800, percentage: 8.1 },
  { province: '四川省', value: 8600, percentage: 7.1 },
  { province: '湖北省', value: 7200, percentage: 5.9 },
  { province: '其他', value: 20300, percentage: 17.1 },
];

export const activityHeatmapData = (() => {
  const data = [];
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      let baseActivity = 20;
      if (hour >= 9 && hour <= 18) {
        baseActivity = 60 + Math.random() * 40;
      } else if (hour >= 19 && hour <= 22) {
        baseActivity = 70 + Math.random() * 30;
      } else if (hour >= 0 && hour <= 7) {
        baseActivity = 5 + Math.random() * 15;
      }
      if (day === 0 || day === 6) {
        baseActivity *= 0.7;
        if (hour >= 10 && hour <= 20) {
          baseActivity = 50 + Math.random() * 40;
        }
      }
      data.push({
        day,
        dayName: days[day],
        hour,
        value: Math.round(baseActivity),
      });
    }
  }
  return data;
})();
