import { useMemo } from "react"
import { ArrowUpRight, MapPinned, Sparkles, Users } from "lucide-react"
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap"
import ChartCard from "@/components/dashboard/ChartCard"
import KpiCard from "@/components/dashboard/KpiCard"
import RegionPie from "@/components/dashboard/RegionPie"
import SalesTrendLine from "@/components/dashboard/SalesTrendLine"
import { makeDashboardData } from "@/utils/dashboardMock"

function formatCompactCny(n: number) {
  const nf = new Intl.NumberFormat("zh-CN", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
  return `${nf.format(n)} 元`
}

function formatUsers(n: number) {
  return new Intl.NumberFormat("zh-CN", { notation: "compact", maximumFractionDigits: 1 }).format(n)
}

export default function Dashboard() {
  const data = useMemo(() => makeDashboardData(42), [])

  return (
    <div className="min-h-screen bg-[#070A0F] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_-10%,rgba(34,211,238,0.18),transparent_60%),radial-gradient(800px_480px_at_95%_20%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(900px_700px_at_50%_110%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-12 pt-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/90" />
              近30天
            </div>
            <h1 className="mt-3 font-[Fraunces] text-3xl font-semibold tracking-tight text-white/95">
              销售数据看板
            </h1>
            <p className="mt-2 max-w-[60ch] text-sm text-white/55">
              统一口径的趋势、结构与时段热力分布，帮助快速定位增长机会。
            </p>
          </div>

          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10"
          >
            <Sparkles className="h-4 w-4 text-cyan-200" />
            数据口径：示例 Mock
            <ArrowUpRight className="h-4 w-4 text-white/50" />
          </a>
        </header>

        <section className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          <KpiCard
            label="用户数"
            value={formatUsers(data.kpi.users)}
            hint="覆盖近30天活跃与转化链路"
            icon={Users}
            accent="cyan"
          />
          <KpiCard
            label="转化率"
            value={`${(data.kpi.conversionRate * 100).toFixed(2)}%`}
            hint="下单/访问（示例口径）"
            icon={Sparkles}
            accent="indigo"
          />
          <KpiCard
            label="日均收入"
            value={formatCompactCny(data.kpi.avgDailyRevenue)}
            hint="按近30天收入均值计算"
            icon={MapPinned}
            accent="emerald"
          />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="销售趋势" subtitle="近30天每日收入（元）">
            <SalesTrendLine points={data.salesTrend} />
          </ChartCard>

          <ChartCard title="地区分布" subtitle="不同省份收入占比">
            <RegionPie items={data.regionShare} />
          </ChartCard>
        </section>

        <section className="mt-4">
          <ChartCard title="用户活跃度" subtitle="日 × 小时分布（热力）">
            <ActivityHeatmap days={data.activity.days} hours={data.activity.hours} values={data.activity.values} />
          </ChartCard>
        </section>
      </main>
    </div>
  )
}

