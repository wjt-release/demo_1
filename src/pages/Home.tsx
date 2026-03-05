import SummaryCard from '@/components/SummaryCard';
import SalesTrendChart from '@/components/SalesTrendChart';
import RegionPieChart from '@/components/RegionPieChart';
import ActivityHeatmap from '@/components/ActivityHeatmap';
import { summaryMetrics } from '@/data/mockData';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1f2e]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#f1f5f9]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            数据看板
          </h1>
          <p className="mt-1 text-sm text-[#64748b]">实时业务数据概览</p>
        </header>

        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryCard
              title="总用户数"
              value={summaryMetrics.totalUsers}
              trend={summaryMetrics.userTrend}
              icon="users"
              index={0}
            />
            <SummaryCard
              title="转化率"
              value={`${summaryMetrics.conversionRate}%`}
              trend={summaryMetrics.conversionTrend}
              icon="target"
              index={1}
            />
            <SummaryCard
              title="日均收入"
              value={`¥${summaryMetrics.dailyRevenue.toLocaleString()}`}
              trend={summaryMetrics.revenueTrend}
              icon="dollar"
              index={2}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SalesTrendChart />
            <RegionPieChart />
          </div>

          <ActivityHeatmap />
        </div>

        <footer className="mt-8 text-center text-xs text-[#475569]">
          数据更新于 {new Date().toLocaleString('zh-CN')}
        </footer>
      </div>
    </div>
  );
}
