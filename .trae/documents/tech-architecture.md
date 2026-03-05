## 1. 架构设计

```mermaid
flowchart TB
    subgraph "Frontend Layer"
        "A[React App]" --> "B[Three.js Scene]"
        "B" --> "C[Terrain Generator]"
        "B" --> "D[Lighting System]"
        "B" --> "E[Contour Lines]"
        "A" --> "F[UI Controls]"
        "F" --> "G[Day/Night Toggle]"
        "F" --> "H[Contour Toggle]"
    end
```

## 2. 技术说明

- **前端框架**: React@18 + TypeScript
- **样式方案**: Tailwind CSS@3
- **构建工具**: Vite
- **3D 引擎**: Three.js + @react-three/fiber + @react-three/drei
- **后端**: 无（纯前端应用）

## 3. 项目结构

```
src/
├── components/
│   ├── Scene.tsx           # 主 3D 场景组件
│   ├── Terrain.tsx         # 地形网格组件
│   ├── River.tsx           # 河流组件
│   ├── Lighting.tsx        # 光照系统
│   ├── ContourLines.tsx    # 等高线组件
│   ├── Sky.tsx             # 天空背景
│   └── Controls/
│       └── ControlPanel.tsx # UI 控制面板
├── hooks/
│   ├── useTerrain.ts       # 地形生成 hook
│   ├── useDayNight.ts      # 昼夜循环 hook
│   └── useContour.ts       # 等高线计算 hook
├── utils/
│   ├── noise.ts            # Perlin/Simplex 噪声算法
│   ├── terrainColors.ts    # 地形颜色渐变
│   └── animations.ts       # 动画过渡工具
├── shaders/
│   ├── terrain.vert        # 地形顶点着色器
│   ├── terrain.frag        # 地形片段着色器
│   └── contour.frag        # 等高线片段着色器
├── types/
│   └── index.ts            # TypeScript 类型定义
├── App.tsx                 # 主应用组件
└── main.tsx               # 入口文件
```

## 4. 核心技术实现

### 4.1 地形生成

使用多层 Simplex 噪声叠加生成高度图:
- 基础层: 大尺度山脉轮廓
- 细节层: 中等尺度山脊
- 纹理层: 小尺度岩石细节

悬崖通过检测坡度阈值，在着色器中应用不同材质。

河流通过在低洼区域降低高度并应用水面材质。

### 4.2 昼夜系统

```typescript
interface DayNightState {
  time: number;           // 0-1 表示一天中的时间
  sunPosition: Vector3;   // 太阳位置
  moonPosition: Vector3;  // 月亮位置
  skyColor: Color;        // 天空颜色
  ambientIntensity: number;
  directionalIntensity: number;
}
```

### 4.3 等高线渲染

使用片段着色器根据高度绘制等高线:
- 采样相邻像素高度差
- 在高度变化处绘制线条
- 支持可调节的等高距

### 4.4 相机控制

使用 @react-three/drei 的 OrbitControls:
- 启用阻尼实现平滑移动
- 限制俯仰角度防止翻转
- 设置缩放范围

## 5. 性能优化

- **LOD**: 根据距离使用不同精度的地形网格
- **Frustum Culling**: Three.js 自动视锥剔除
- **纹理压缩**: 使用压缩纹理格式
- **着色器优化**: 避免复杂计算，使用内置函数

## 6. 关键依赖

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "@react-three/postprocessing": "^2.15.0",
    "simplex-noise": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/three": "^0.160.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```
