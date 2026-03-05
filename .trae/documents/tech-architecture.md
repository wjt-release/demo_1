## 1. 架构设计

```mermaid
flowchart TB
    subgraph "Frontend Layer"
        "A[HTML/CSS/JS]"
        "B[Chart.js]"
    end
    subgraph "Data Layer"
        "C[Mock Data]"
    end
    "C" --> "A"
    "A" --> "B"
```

## 2. 技术说明

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **图表库**: Chart.js v4 (通过 CDN 引入)
- **样式方案**: Tailwind CSS (通过 CDN 引入)
- **数据来源**: 模拟数据 (Mock Data)
- **构建工具**: 无需构建，纯静态页面

## 3. 路由定义

| 路由 | 用途 |
|-----|------|
| / 或 /index.html | 数据看板主页面 |

## 4. 数据模型

### 4.1 汇总指标数据

```javascript
const summaryData = {
  users: { value: 128456, trend: 12.5, label: '总用户数' },
  conversion: { value: 3.24, trend: -2.1, label: '转化率 (%)' },
  dailyRevenue: { value: 89560, trend: 8.3, label: '日均收入 (¥)' }
}
```

### 4.2 销售趋势数据

```javascript
const salesTrendData = {
  labels: ['Day1', 'Day2', ..., 'Day30'],
  values: [1200, 1350, 1280, ...]
}
```

### 4.3 地区分布数据

```javascript
const regionData = {
  labels: ['广东省', '浙江省', '江苏省', '北京市', '上海市', '其他'],
  values: [28, 18, 15, 12, 10, 17]
}
```

### 4.4 用户活跃度热力图数据

```javascript
const heatmapData = {
  days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  hours: ['00:00', '01:00', ..., '23:00'],
  values: [[value1, value2, ...], ...] // 7x24 矩阵
}
```

## 5. 项目结构

```
/workspace/
├── index.html          # 主页面
├── styles.css          # 自定义样式
├── app.js              # 主逻辑和数据
└── .trae/
    └── documents/
        ├── prd.md
        └── tech-architecture.md
```

## 6. 性能优化

- 使用 CDN 加载 Chart.js 和 Tailwind CSS
- 图表按需渲染，避免重复初始化
- 使用 CSS 动画代替 JavaScript 动画
- 响应式设计，适配不同屏幕尺寸
