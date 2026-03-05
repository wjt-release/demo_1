import React from 'react';
import SummaryCards from './SummaryCards';
import SalesTrendChart from './SalesTrendChart';
import RegionalPieChart from './RegionalPieChart';
import ActivityHeatmap from './ActivityHeatmap';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Overview of key business metrics and performance indicators.
          </p>
        </header>

        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SalesTrendChart />
          </div>
          <div className="lg:col-span-1">
            <RegionalPieChart />
          </div>
        </div>

        <div className="mt-8">
          <ActivityHeatmap />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
