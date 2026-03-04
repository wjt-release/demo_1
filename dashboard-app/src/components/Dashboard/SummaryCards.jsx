import React from 'react';
import { Users, TrendingUp, DollarSign } from 'lucide-react';

const Card = ({ title, value, trend, icon: Icon, trendUp }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold mt-2 text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        <Icon size={24} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </span>
      <span className="text-gray-400 ml-2">较上月</span>
    </div>
  </div>
);

const SummaryCards = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card
        title="总用户数"
        value={data.users.value.toLocaleString()}
        trend={parseFloat(data.users.trend)}
        icon={Users}
        trendUp={parseFloat(data.users.trend) > 0}
      />
      <Card
        title="转化率"
        value={`${data.conversionRate.value}%`}
        trend={parseFloat(data.conversionRate.trend)}
        icon={TrendingUp}
        trendUp={parseFloat(data.conversionRate.trend) > 0}
      />
      <Card
        title="日均收入"
        value={`¥${data.revenue.value.toLocaleString()}`}
        trend={parseFloat(data.revenue.trend)}
        icon={DollarSign}
        trendUp={parseFloat(data.revenue.trend) > 0}
      />
    </div>
  );
};

export default SummaryCards;
