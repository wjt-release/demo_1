# QR Code Generator - Product Requirements Document (PRD)

## 1. Product Overview

### 1.1 Product Name
Instant QR - 极简在线二维码生成工具

### 1.2 Product Vision
打造最简洁、最快速的在线二维码生成工具，用户无需注册、登录或安装任何软件，只需粘贴内容即可即时获得高质量二维码图片。

### 1.3 Target Users
- 需要快速生成二维码的普通互联网用户
- 营销人员、内容创作者
- 需要分享链接的移动端用户
- 追求效率的办公人员

## 2. Core Features

### 2.1 Input Box
- **Description**: 大而清晰的文本输入框
- **Placeholder**: "粘贴你的网址或文本链接"
- **Support**: HTTP/HTTPS链接、纯文本内容
- **Behavior**: 支持粘贴、手动输入

### 2.2 Instant Generation
- **Trigger**: 用户停止输入1秒后自动生成
- **No Button**: 无需点击"生成"按钮
- **Debounce**: 1秒防抖延迟，避免频繁生成

### 2.3 QR Code Display
- **Position**: 输入框下方
- **Size**: 足够大，确保扫描成功率
- **Format**: PNG格式，保证清晰度
- **Quality**: 高分辨率，适合打印

### 2.4 Save Function
- **Method**: 右键保存图片
- **Format**: PNG
- **Filename**: 自动命名为 qrcode.png

## 3. User Experience Requirements

### 3.1 No Registration/Login
- 完全匿名使用
- 无需任何账户信息
- 无数据收集

### 3.2 No Installation
- 纯Web应用
- 无浏览器插件依赖
- 无桌面软件依赖

### 3.3 Minimal Interface
- 专注核心功能
- 减少视觉干扰
- 清晰的视觉层次

### 3.4 Responsive Design
- 桌面端优化
- 平板适配
- 手机端友好

### 3.5 Performance
- 快速加载 (< 2秒)
- 高效生成 (< 500ms)
- 轻量级资源

### 3.6 Security
- 前端生成，无服务器交互
- 无数据传输
- 无XSS风险

## 4. Technical Constraints

### 4.1 Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 4.2 Technology Stack
- Pure HTML/CSS/JavaScript
- No framework dependencies
- Canvas API for QR generation
- Client-side only

## 5. Success Metrics

### 5.1 Performance Metrics
- 页面加载时间 < 2秒
- 二维码生成时间 < 500ms
- 首次内容绘制 < 1秒

### 5.2 User Experience Metrics
- 零学习成本
- 一键操作
- 即时反馈

## 6. Design Direction

### 6.1 Aesthetic Style
- **Tone**: 极简主义 + 现代感
- **Color**: 深色主题，突出二维码
- **Typography**: 现代无衬线字体
- **Layout**: 居中对齐，大量留白

### 6.2 Visual Elements
- 柔和的背景渐变
- 卡片式容器
- 微妙的阴影效果
- 流畅的过渡动画

## 7. Future Considerations

### 7.1 Potential Enhancements
- 二维码颜色自定义
- Logo嵌入功能
- 不同尺寸选择
- 批量生成

### 7.2 Not in Scope (MVP)
- 用户账户系统
- 云端存储
- 二维码解析
- API接口
