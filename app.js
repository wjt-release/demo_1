const mockData = {
  metrics: {
    users: { value: 128456, change: 12.5 },
    conversionRate: { value: 3.24, change: 0.8 },
    dailyRevenue: { value: 89420, change: -2.1 }
  },
  salesTrend: generateSalesData(),
  regionDistribution: [
    { province: '广东', value: 25 },
    { province: '浙江', value: 18 },
    { province: '江苏', value: 15 },
    { province: '北京', value: 12 },
    { province: '上海', value: 10 },
    { province: '四川', value: 8 },
    { province: '其他', value: 12 }
  ],
  heatmapData: generateHeatmapData()
};

function generateSalesData() {
  const labels = [];
  const data = [];
  const baseDate = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
    data.push(Math.floor(Math.random() * 500) + 800);
  }
  
  return { labels, data };
}

function generateHeatmapData() {
  const data = [];
  for (let day = 0; day < 7; day++) {
    const dayData = [];
    for (let hour = 0; hour < 24; hour++) {
      let baseValue = 10;
      if (hour >= 9 && hour <= 18) {
        baseValue = 50 + Math.random() * 40;
      } else if (hour >= 19 && hour <= 22) {
        baseValue = 60 + Math.random() * 35;
      } else if (hour >= 0 && hour <= 6) {
        baseValue = 5 + Math.random() * 10;
      } else {
        baseValue = 20 + Math.random() * 20;
      }
      
      if (day >= 5) {
        baseValue *= 0.7;
      }
      
      dayData.push(Math.floor(baseValue));
    }
    data.push(dayData);
  }
  return data;
}

function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
}

function animateValue(element, start, end, duration, prefix = '', suffix = '') {
  const startTime = performance.now();
  const isFloat = !Number.isInteger(end);
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeProgress;
    
    if (isFloat) {
      element.textContent = prefix + current.toFixed(2) + suffix;
    } else {
      element.textContent = prefix + formatNumber(Math.floor(current)) + suffix;
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function updateMetrics() {
  const { users, conversionRate, dailyRevenue } = mockData.metrics;
  
  animateValue(
    document.getElementById('usersValue'),
    0,
    users.value,
    1500
  );
  
  animateValue(
    document.getElementById('conversionValue'),
    0,
    conversionRate.value,
    1500,
    '',
    '%'
  );
  
  animateValue(
    document.getElementById('revenueValue'),
    0,
    dailyRevenue.value,
    1500,
    '¥'
  );
  
  const usersChange = document.getElementById('usersChange');
  usersChange.textContent = `+${users.change}%`;
  usersChange.className = `metric-change ${users.change >= 0 ? 'positive' : 'negative'}`;
  
  const conversionChange = document.getElementById('conversionChange');
  conversionChange.textContent = `+${conversionRate.change}%`;
  conversionChange.className = `metric-change ${conversionRate.change >= 0 ? 'positive' : 'negative'}`;
  
  const revenueChange = document.getElementById('revenueChange');
  revenueChange.textContent = `${dailyRevenue.change}%`;
  revenueChange.className = `metric-change ${dailyRevenue.change >= 0 ? 'positive' : 'negative'}`;
}

function createSalesChart() {
  const ctx = document.getElementById('salesChart').getContext('2d');
  
  const gradient = ctx.createLinearGradient(0, 0, 0, 320);
  gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: mockData.salesTrend.labels,
      datasets: [{
        label: '销售额',
        data: mockData.salesTrend.data,
        borderColor: '#6366f1',
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#6366f1',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(26, 26, 53, 0.95)',
          titleColor: '#f0f0ff',
          bodyColor: '#f0f0ff',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: (items) => `日期: ${items[0].label}`,
            label: (item) => `销售额: ¥${item.raw.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(99, 102, 241, 0.08)',
            drawBorder: false
          },
          ticks: {
            color: '#8888aa',
            font: {
              family: 'DM Sans',
              size: 11
            },
            maxRotation: 0,
            maxTicksLimit: 10
          }
        },
        y: {
          grid: {
            color: 'rgba(99, 102, 241, 0.08)',
            drawBorder: false
          },
          ticks: {
            color: '#8888aa',
            font: {
              family: 'JetBrains Mono',
              size: 11
            },
            callback: (value) => '¥' + value.toLocaleString()
          },
          beginAtZero: true
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeOutQuart'
      }
    }
  });
}

function createRegionChart() {
  const ctx = document.getElementById('regionChart').getContext('2d');
  
  const colors = [
    '#6366f1',
    '#22d3ee',
    '#a855f7',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6'
  ];
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: mockData.regionDistribution.map(r => r.province),
      datasets: [{
        data: mockData.regionDistribution.map(r => r.value),
        backgroundColor: colors,
        borderColor: '#1a1a35',
        borderWidth: 3,
        hoverBorderColor: '#fff',
        hoverBorderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#f0f0ff',
            font: {
              family: 'DM Sans',
              size: 12
            },
            padding: 16,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(26, 26, 53, 0.95)',
          titleColor: '#f0f0ff',
          bodyColor: '#f0f0ff',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (item) => `${item.label}: ${item.raw}%`
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500,
        easing: 'easeOutQuart'
      }
    }
  });
}

function createHeatmapChart() {
  const canvas = document.getElementById('heatmapChart');
  const ctx = canvas.getContext('2d');
  
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  const width = rect.width;
  const height = rect.height;
  const padding = { top: 30, right: 20, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const cellWidth = chartWidth / 24;
  const cellHeight = chartHeight / 7;
  
  const dayLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  
  ctx.fillStyle = '#8888aa';
  ctx.font = '11px DM Sans';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  
  dayLabels.forEach((label, i) => {
    const y = padding.top + i * cellHeight + cellHeight / 2;
    ctx.fillText(label, padding.left - 10, y);
  });
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (let hour = 0; hour < 24; hour += 4) {
    const x = padding.left + hour * cellWidth + cellWidth / 2;
    ctx.fillText(`${hour}:00`, x, padding.top + chartHeight + 8);
  }
  
  const maxValue = Math.max(...mockData.heatmapData.flat());
  
  mockData.heatmapData.forEach((dayData, dayIndex) => {
    dayData.forEach((value, hourIndex) => {
      const x = padding.left + hourIndex * cellWidth;
      const y = padding.top + dayIndex * cellHeight;
      
      const intensity = value / maxValue;
      const color = getHeatmapColor(intensity);
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2, 3);
      ctx.fill();
    });
  });
  
  const legendWidth = 150;
  const legendHeight = 10;
  const legendX = width - padding.right - legendWidth;
  const legendY = 8;
  
  const legendGradient = ctx.createLinearGradient(legendX, 0, legendX + legendWidth, 0);
  legendGradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
  legendGradient.addColorStop(1, 'rgba(99, 102, 241, 0.9)');
  
  ctx.fillStyle = legendGradient;
  ctx.beginPath();
  ctx.roundRect(legendX, legendY, legendWidth, legendHeight, 5);
  ctx.fill();
  
  ctx.fillStyle = '#8888aa';
  ctx.font = '10px DM Sans';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('低', legendX - 15, legendY + legendHeight / 2);
  ctx.textAlign = 'right';
  ctx.fillText('高', legendX + legendWidth + 15, legendY + legendHeight / 2);
}

function getHeatmapColor(intensity) {
  const r = Math.floor(99 + (34 - 99) * intensity);
  const g = Math.floor(102 + (211 - 102) * intensity);
  const b = Math.floor(241 + (238 - 241) * intensity);
  const a = 0.2 + intensity * 0.8;
  
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function updateTime() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  document.getElementById('currentTime').textContent = now.toLocaleString('zh-CN', options);
}

function init() {
  updateTime();
  setInterval(updateTime, 1000);
  
  setTimeout(() => {
    updateMetrics();
  }, 300);
  
  setTimeout(() => {
    createSalesChart();
  }, 600);
  
  setTimeout(() => {
    createRegionChart();
  }, 800);
  
  setTimeout(() => {
    createHeatmapChart();
  }, 1000);
}

document.addEventListener('DOMContentLoaded', init);

window.addEventListener('resize', () => {
  createHeatmapChart();
});
