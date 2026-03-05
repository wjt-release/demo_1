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
- **图表库**: Chart.js@4 + react-chartjs-2
- **初始化工具**: Vite
- **后端**: 无（使用 Mock 数据）
- **数据源**: 本地 Mock 数据模拟真实业务数据

## 3. 路由定义

| 路由 | 用途 |
|------|------|
| / | 数据看板主页，展示所有数据可视化模块 |

## 4. 数据模型

### 4.1 汇总指标数据

```typescript
interface SummaryMetrics {
  totalUsers: number;
  conversionRate: number;
  dailyRevenue: number;
  userGrowth: number;
  conversionChange: number;
  revenueChange: number;
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

## 5. 组件架构

```mermaid
flowchart TD
    "App" --> "Dashboard"
    "Dashboard" --> "SummaryCards"
    "Dashboard" --> "SalesTrendChart"
    "Dashboard" --> "RegionPieChart"
    "Dashboard" --> "ActivityHeatmap"
    "SummaryCards" --> "MetricCard"
```

## 6. 项目结构

```
src/
├── components/
│   ├── Dashboard.jsx
│   ├── SummaryCards.jsx
│   ├── MetricCard.jsx
│   ├── SalesTrendChart.jsx
│   ├── RegionPieChart.jsx
│   └── ActivityHeatmap.jsx
├── data/
│   └── mockData.js
├── App.jsx
├── main.jsx
└── index.css
```
