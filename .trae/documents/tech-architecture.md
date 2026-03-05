## 1. Architecture Design

```mermaid
flowchart TB
    subgraph "Frontend Layer"
        "UI Components"
        "QR Code Generator"
        "State Management"
    end
    
    subgraph "External Libraries"
        "qrcode.js library"
    end
    
    "UI Components" --> "State Management"
    "State Management" --> "QR Code Generator"
    "QR Code Generator" --> "qrcode.js library"
```

## 2. Technology Description
- **Frontend**: React@18 + Tailwind CSS@3 + Vite
- **Initialization Tool**: Vite (React template)
- **Backend**: None (纯前端应用)
- **Database**: None (无需数据存储)
- **QR Code Library**: qrcode.react 或 qrcode (npm package)

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 主页面，包含输入框和二维码生成功能 |

## 4. API Definitions
无后端API，所有功能在前端完成。

## 5. Server Architecture Diagram
不适用（无后端服务）

## 6. Data Model
### 6.1 Data Model Definition
不适用（无需数据存储）

### 6.2 Data Definition Language
不适用

## 7. Technical Implementation Details

### 7.1 QR Code Generation
- 使用 `qrcode` npm 包进行二维码生成
- 生成 PNG 格式图片，确保高质量
- 支持自定义尺寸和纠错级别

### 7.2 Debounce Implementation
- 使用防抖技术，用户停止输入1秒后触发生成
- 避免频繁生成影响性能

### 7.3 Image Save Functionality
- 二维码渲染为 Canvas 元素
- 用户可右键保存为 PNG 图片
- 或提供下载按钮作为备选方案

### 7.4 Performance Optimization
- 按需加载 QR Code 库
- 使用 CSS 动画替代 JS 动画
- 最小化依赖包体积
