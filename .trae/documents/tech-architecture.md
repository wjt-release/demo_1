## 1. 架构设计

```mermaid
flowchart TB
    subgraph "Frontend Layer"
        "React App"
        "Chart.js"
        "Tailwind CSS"
    end
    
    subgraph "Data Layer"
        "Mock Data"
    end
    
    "React App" --> "Chart.js"
    "React App" --> "Tailwind CSS"
    "React App" --> "Mock Data"
```

## 2. 技术说明

- **前端框架**: React@18 + Vite
- **样式方案**: Tailwind CSS@3
- **图表库**: Chart.js@4 (通过 react-chartjs-2)
- **初始化工具**: Vite
- **后端**: 无 (使用模拟数据)
- **数据源**: 本地 Mock 数据

## 3. 路由定义

| 路由 | 用途 |
|-----|------|
| / | 数据看板主页面 |

## 4. 数据模型

### 4.1 汇总指标数据

```typescript
interface SummaryMetrics {
  totalUsers: number;
  conversionRate: number;
  dailyRevenue: number;
  userTrend: number;
  conversionTrend: number;
  revenueTrend: number;
}
```

### 4.2 销售趋势数据

```typescript
interface SalesTrend {
  date: string;
  sales: number;
  orders: number;
}
```

### 4.3 地区分布数据

```typescript
interface RegionDistribution {
  province: string;
  value: number;
  percentage: number;
}
```

### 4.4 用户活跃度数据

```typescript
interface ActivityHeatmap {
  day: number;
  hour: number;
  value: number;
}
```

## 5. 组件结构

```
src/
├── components/
│   ├── SummaryCard.tsx       # 汇总指标卡片
│   ├── SalesTrendChart.tsx   # 销售趋势折线图
│   ├── RegionPieChart.tsx    # 地区分布饼图
│   └── ActivityHeatmap.tsx   # 用户活跃度热力图
├── data/
│   └── mockData.ts           # 模拟数据
├── App.tsx                   # 主应用组件
├── main.tsx                  # 入口文件
└── index.css                 # 全局样式
```

## 6. 图表配置

### 6.1 Chart.js 全局配置

```javascript
{
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#94a3b8',
        font: { family: 'Space Grotesk' }
      }
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      borderColor: '#334155',
      borderWidth: 1
    }
  }
}
```

### 6.2 颜色方案

```javascript
const colors = {
  primary: '#00d4aa',
  secondary: '#ff6b35',
  tertiary: '#6366f1',
  quaternary: '#f59e0b',
  background: '#1a1f2e',
  card: '#242938',
  border: '#2d3548',
  text: '#f1f5f9',
  textMuted: '#94a3b8'
};
```
