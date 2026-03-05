# Product Requirements Document (PRD)

## 1. Project Overview
This project aims to build a modern, responsive web data dashboard to visualize key business metrics. The dashboard will provide actionable insights through interactive charts and summary cards, designed with a clean, unified, and card-based aesthetic.

## 2. User Stories
- As a business analyst, I want to see the sales trend over the last 30 days to identify growth patterns.
- As a regional manager, I want to view the sales distribution across different provinces to understand regional performance.
- As a product manager, I want to analyze user activity heatmaps to determine peak usage times.
- As an executive, I want a quick overview of key metrics (user count, conversion rate, daily average revenue) at the top of the page.

## 3. Functional Requirements

### 3.1 Dashboard Layout
- **Structure**: A responsive grid layout with a top summary section followed by chart modules.
- **Style**: Modern, clean, card-based design with consistent spacing, typography, and color palette.
- **Responsiveness**: The layout must adapt seamlessly to different screen sizes (desktop, tablet, mobile).

### 3.2 Top Summary Metrics
- **Components**: Three summary cards.
- **Metrics**:
  - **User Count**: Total number of users.
  - **Conversion Rate**: Percentage of users who completed a desired action.
  - **Daily Average Revenue**: Average revenue generated per day.
- **Visuals**: Each card should display the metric name, value, and potentially a small trend indicator (e.g., up/down arrow).

### 3.3 Sales Trend Line Chart
- **Data**: Sales data for the last 30 days.
- **Visualization**: A line chart showing sales volume over time.
- **Interactivity**: Tooltips on hover to show exact values for specific dates.
- **Library**: Chart.js or Plotly.

### 3.4 Regional Distribution Pie Chart
- **Data**: Sales distribution across different provinces.
- **Visualization**: A pie chart or donut chart representing the share of each province.
- **Interactivity**: Tooltips on hover to show the percentage and value for each region.
- **Library**: Chart.js or Plotly.

### 3.5 User Activity Heatmap
- **Data**: User activity levels distributed by day of the week and hour of the day.
- **Visualization**: A heatmap grid where color intensity represents activity level.
- **Axes**:
  - X-axis: Hours of the day (0-23).
  - Y-axis: Days of the week (Mon-Sun).
- **Interactivity**: Tooltips on hover to show activity count.
- **Library**: Chart.js or Plotly (or a specialized heatmap component compatible with these).

## 4. Non-Functional Requirements
- **Performance**: The dashboard should load quickly and charts should render smoothly.
- **Browser Compatibility**: Support modern browsers (Chrome, Firefox, Safari, Edge).
- **Code Quality**: Clean, modular, and well-documented code.

## 5. UI/UX Design
- **Theme**: Light or Dark mode (to be decided, default to Light with a modern color palette).
- **Color Palette**: Professional and distinct colors for charts to ensure readability.
- **Typography**: Clean sans-serif fonts (e.g., Inter, Roboto, or similar).
- **Cards**: subtle shadows, rounded corners, and padding to create a distinct card effect.

## 6. Tech Stack
- **Frontend Framework**: React, Vue, or plain HTML/JS (React is recommended for component modularity).
- **Charting Library**: Chart.js or Plotly (Chart.js is often preferred for simpler, responsive charts).
- **Styling**: CSS (Tailwind CSS is recommended for rapid, modern styling) or CSS-in-JS.
