import React from 'react';
import { useMockData } from './hooks/useMockData';
import SummaryCards from './components/Dashboard/SummaryCards';
import SalesChart from './components/Dashboard/SalesChart';
import RegionChart from './components/Dashboard/RegionChart';
import ActivityHeatmap from './components/Dashboard/ActivityHeatmap';
import { LayoutDashboard, RefreshCw } from 'lucide-react';

function App() {
  const { data, loading } = useMockData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">业务数据看板</h1>
              <p className="text-sm text-gray-500">实时监控核心业务指标</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
          >
            <RefreshCw size={16} />
            刷新数据
          </button>
        </header>

        <main>
          {data && (
            <>
              <SummaryCards data={data.summary} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <SalesChart data={data.sales} />
                </div>
                <div className="lg:col-span-1">
                  <RegionChart data={data.region} />
                </div>
              </div>

              <div className="w-full">
                 <ActivityHeatmap data={data.heatmap} />
              </div>
            </>
          )}
        </main>
        
        <footer className="mt-12 text-center text-gray-400 text-sm py-6 border-t border-gray-100">
          &copy; {new Date().getFullYear()} 数据看板 Demo. Powered by React, Tailwind & Plotly.
        </footer>
      </div>
    </div>
  );
}

export default App;
