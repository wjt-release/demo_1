import React from 'react';
import { Users, DollarSign, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { summaryData } from '../data/mockData';

const Card = ({ title, value, trend, icon: Icon, color }) => {
  const isPositive = trend >= 0;
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {Math.abs(trend)}%
        </div>
      </div>
    </div>
  );
};

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card
        title="Total Users"
        value={summaryData.userCount.toLocaleString()}
        trend={summaryData.userCountTrend}
        icon={Users}
        color="bg-blue-500"
      />
      <Card
        title="Conversion Rate"
        value={`${summaryData.conversionRate}%`}
        trend={summaryData.conversionRateTrend}
        icon={Activity}
        color="bg-purple-500"
      />
      <Card
        title="Daily Avg Revenue"
        value={`¥${summaryData.dailyRevenue.toLocaleString()}`}
        trend={summaryData.dailyRevenueTrend}
        icon={DollarSign}
        color="bg-green-500"
      />
    </div>
  );
};

export default SummaryCards;
