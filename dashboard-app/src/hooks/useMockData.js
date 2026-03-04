import { useState, useEffect } from 'react';
import { generateSummaryData, generateSalesData, generateRegionData, generateHeatmapData } from '../utils/mockData';

export const useMockData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载延迟
    const timer = setTimeout(() => {
      setData({
        summary: {
          users: {
            value: Math.floor(Math.random() * 5000) + 10000,
            trend: (Math.random() * 20 - 10).toFixed(1),
          },
          conversionRate: {
            value: (Math.random() * 5 + 2).toFixed(2),
            trend: (Math.random() * 5 - 2).toFixed(1),
          },
          revenue: {
            value: Math.floor(Math.random() * 50000) + 100000,
            trend: (Math.random() * 15 - 5).toFixed(1),
          },
        },
        sales: generateSalesData(),
        region: generateRegionData(),
        heatmap: generateHeatmapData(),
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
};
