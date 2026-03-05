import { MetricCard } from './MetricCard';
import { summaryMetrics } from '@/data/mockData';

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard
        title="总用户数"
        value={summaryMetrics.totalUsers}
        change={summaryMetrics.userGrowth}
        icon="users"
        format="number"
        delay={0}
      />
      <MetricCard
        title="转化率"
        value={summaryMetrics.conversionRate}
        change={summaryMetrics.conversionChange}
        icon="target"
        format="percent"
        delay={100}
      />
      <MetricCard
        title="日均收入"
        value={summaryMetrics.dailyRevenue}
        change={summaryMetrics.revenueChange}
        icon="dollar"
        format="currency"
        delay={200}
      />
    </div>
  );
}
