// src/utils/mockData.js

export const generateSummaryData = () => {
  return {
    users: {
      value: Math.floor(Math.random() * 5000) + 10000,
      trend: (Math.random() * 20 - 10).toFixed(1), // -10% to +10%
    },
    conversionRate: {
      value: (Math.random() * 5 + 2).toFixed(2), // 2% to 7%
      trend: (Math.random() * 5 - 2).toFixed(1),
    },
    revenue: {
      value: Math.floor(Math.random() * 50000) + 100000,
      trend: (Math.random() * 15 - 5).toFixed(1),
    },
  };
};

export const generateSalesData = () => {
  const dates = [];
  const sales = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
    sales.push(Math.floor(Math.random() * 5000) + 2000); // 2000 - 7000
  }

  return { dates, sales };
};

export const generateRegionData = () => {
  const provinces = ['广东', '北京', '上海', '浙江', '江苏', '四川', '湖北', '福建', '山东', '其他'];
  const values = provinces.map(() => Math.floor(Math.random() * 1000) + 100);
  return { provinces, values };
};

export const generateHeatmapData = () => {
  // 7 days (Mon-Sun), 24 hours
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}点`);
  const z = [];

  for (let i = 0; i < 7; i++) {
    const row = [];
    for (let j = 0; j < 24; j++) {
      // Simulate activity pattern: higher during day (9-18), lower at night
      let base = 10;
      if (j >= 9 && j <= 18) base = 50;
      if (j >= 19 && j <= 22) base = 40;
      
      row.push(Math.floor(Math.random() * 30) + base);
    }
    z.push(row);
  }

  return { days, hours, z };
};
