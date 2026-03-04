# 技术架构文档 (Technical Architecture)

## 1. 概览
本项目是一个基于 Web 的数据看板页面，采用现代前端技术栈构建，专注于高性能数据可视化和良好的用户体验。

## 2. 技术选型

### 2.1 前端框架
- **React**: 用于构建用户界面，利用其组件化特性管理复杂的图表和布局。
- **Vite**: 作为构建工具，提供快速的开发服务器和优化的生产构建。

### 2.2 UI 库与样式
- **Tailwind CSS**: 用于快速构建现代、响应式的用户界面。提供原子类 utility-first 的开发方式，便于统一风格。
- **Lucide React**: 提供高质量的图标库，用于增强视觉表现。

### 2.3 数据可视化
- **Plotly.js (react-plotly.js)**: 强大的开源图表库，支持丰富的交互功能，特别适合构建复杂的折线图、饼图和热力图。
  - *选择理由*: Plotly 对热力图的支持优于 Chart.js，且交互性强，适合数据分析场景。

### 2.4 数据模拟
- **Faker.js / 自定义 Mock**: 在前端生成模拟数据以展示图表效果。

## 3. 系统架构

### 3.1 目录结构
```
src/
├── components/          # UI 组件
│   ├── Dashboard/       # 看板相关组件
│   │   ├── SummaryCards.jsx  # 汇总指标卡片
│   │   ├── SalesChart.jsx    # 销售趋势图
│   │   ├── RegionChart.jsx   # 地区分布图
│   │   └── ActivityHeatmap.jsx # 用户活跃热力图
│   └── Layout/          # 布局组件
├── hooks/               # 自定义 Hooks (如 useMockData)
├── utils/               # 工具函数
├── App.jsx              # 主应用组件
└── main.jsx             # 入口文件
```

### 3.2 数据流
- **Mock Data Layer**: 模拟后端 API 返回的数据结构。
- **State Management**: 使用 React Context 或简单的 Props 传递数据至各个图表组件。
- **Rendering**: 组件接收数据后使用 Plotly.js 进行渲染。

## 4. 关键组件设计

### 4.1 SummaryCards
- 展示三个关键指标：用户数、转化率、日均收入。
- 每个指标包含：标题、数值、趋势图标（可选）。

### 4.2 SalesChart
- 使用 Plotly.js 的 Scatter (mode: lines) 类型。
- 配置 X 轴为日期，Y 轴为销售额。
- 样式定制：线条平滑、区域填充（可选）、自定义颜色。

### 4.3 RegionChart
- 使用 Plotly.js 的 Pie 类型。
- 配置 Labels 为省份，Values 为数值。
- 样式定制：自定义调色板，确保视觉和谐。

### 4.4 ActivityHeatmap
- 使用 Plotly.js 的 Heatmap 类型。
- X 轴：0-23 小时。
- Y 轴：周一至周日。
- Z 轴：活跃度数值。
- 样式定制：自定义颜色映射 (Colorscale)，去除多余网格线。

## 5. 部署方案
- 本地开发：`npm run dev`
- 生产构建：`npm run build` -> 生成静态文件 -> 部署至任何静态网站托管服务 (如 Vercel, Netlify, Nginx)。
