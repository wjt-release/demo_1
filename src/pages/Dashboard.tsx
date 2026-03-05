import { SummaryCards } from '@/components/SummaryCards';
import { SalesTrendChart } from '@/components/SalesTrendChart';
import { RegionPieChart } from '@/components/RegionPieChart';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import { BarChart3, Bell, Settings, User } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">数据看板</h1>
                <p className="text-xs text-slate-400">实时业务数据监控</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <SummaryCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesTrendChart />
          <RegionPieChart />
        </div>
        
        <div className="mt-6">
          <ActivityHeatmap />
        </div>
      </main>

      <footer className="border-t border-white/5 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-slate-500">
            数据更新时间: {new Date().toLocaleString('zh-CN')}
          </p>
        </div>
      </footer>
    </div>
  );
}
