# Technical Architecture Document: Minimalist QR Code Generator

## 1. Overview
This document outlines the technical architecture for the Minimalist Online QR Code Generator. The application is a client-side Single Page Application (SPA) designed for speed, simplicity, and privacy.

## 2. Technology Stack

### 2.1 Frontend Framework
- **Framework**: React (using Vite for fast development and optimized build).
- **Language**: JavaScript (ES6+).
- **Styling**: Tailwind CSS (for rapid, responsive, utility-first styling).

### 2.2 Core Libraries
- **QR Code Generation**: `qrcode.react` (React wrapper for `qrcode` library) or `qrcode` directly. We will use `qrcode.react` for seamless integration.
- **Debouncing**: Lodash (specifically `lodash.debounce`) or a custom hook to manage input delay.

### 2.3 Build Tooling
- **Bundler**: Vite.
- **Package Manager**: npm.

## 3. Architecture Components

### 3.1 Input Component
- **Responsibility**: Capture user input (URL or text).
- **State**: Managed via React `useState`.
- **Validation**: Basic length checks.

### 3.2 QR Display Component
- **Responsibility**: Render the QR code based on input.
- **Logic**: Use `useEffect` to trigger generation when input changes (debounced).
- **Output**: `<canvas>` or `<img>` element. To support right-click save, `<img>` (Data URI) is preferred over raw `<canvas>`, or we provide a download button that converts canvas to image. `qrcode.react` renders a canvas by default but can render SVG. We can convert canvas to image URL for easier saving if needed, but modern browsers handle canvas right-click well. A dedicated "Download" button is safer.

### 3.3 Layout & Design
- **Structure**: A centered container with:
    1. Header (Title/Logo).
    2. Input Area.
    3. QR Code Display Area.
    4. Footer (Privacy Note).
- **Responsive**: Flexbox/Grid layout using Tailwind classes.

## 4. Data Flow
1. User types in Input Component.
2. `onChange` event updates local state.
3. Debounce function waits for user to stop typing (e.g., 500ms).
4. Validated input is passed to QR Display Component.
5. QR Library generates the code.
6. Component re-renders with new QR code.

## 5. Security & Privacy
- **Client-Side Only**: All logic executes in the browser.
- **No API Calls**: No backend server required for generation.
- **CSP**: Content Security Policy to prevent XSS (standard Vite config).

## 6. Deployment
- **Hosting**: Static hosting (e.g., Vercel, Netlify, GitHub Pages).
- **CI/CD**: Standard workflows (optional for initial version).

## 7. Future Considerations
- **Customization**: Colors, logos in QR code.
- **History**: LocalStorage to save recent codes.
- **PWA**: Make it installable as a Progressive Web App.
