import { ChartCard } from "@/components/ChartCard"
import { KpiCard } from "@/components/KpiCard"
import { ActivityHeatmap } from "@/components/charts/ActivityHeatmap"
import { RegionPie } from "@/components/charts/RegionPie"
import { TrendLine } from "@/components/charts/TrendLine"
import { Button } from "@/components/ui/Button"
import { SegmentedControl } from "@/components/ui/SegmentedControl"
import {
  applyProvinceFilter,
  buildDashboardData,
  formatCny,
  formatInt,
  formatPct,
  type RangeDays,
  type TrendMetric,
} from "@/lib/mockData"
import { cn } from "@/lib/utils"
import html2canvas from "html2canvas"
import { ArrowDownToLine, RefreshCw, Users, Waypoints, Wallet } from "lucide-react"
import { useMemo, useRef, useState } from "react"

function rangeLabel(d: RangeDays) {
  if (d === 7) return "近7天"
  if (d === 30) return "近30天"
  return "近90天"
}

export default function Dashboard() {
  const [range, setRange] = useState<RangeDays>(30)
  const [metric, setMetric] = useState<TrendMetric>("revenue")
  const [province, setProvince] = useState<string | null>(null)
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1_000_000_000))
  const rootRef = useRef<HTMLDivElement | null>(null)

  const base = useMemo(() => buildDashboardData(range, seed), [range, seed])
  const data = useMemo(() => applyProvinceFilter(base, province), [base, province])

  const titleSuffix = province ? ` · ${province}` : ""

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[color:var(--bg)] text-[color:var(--fg)]"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-6">
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <div className="text-xs font-medium tracking-[0.18em] text-white/45">DASHBOARD</div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              销售数据看板{titleSuffix}
            </h1>
            <div className="mt-2 text-sm text-white/55">
              {rangeLabel(range)} · 悬浮查看明细 · 点击地区进行筛选
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SegmentedControl<`${RangeDays}`>
              value={`${range}`}
              options={[
                { value: "7", label: "7天" },
                { value: "30", label: "30天" },
                { value: "90", label: "90天" },
              ]}
              onChange={(v) => setRange(Number(v) as RangeDays)}
            />
            <Button
              variant="ghost"
              onClick={() => setSeed((s) => (s + 1) % 2_000_000_000)}
            >
              <RefreshCw className="h-4 w-4" />
              刷新
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                const el = rootRef.current
                if (!el) return
                Promise.resolve()
                  .then(() => new Promise<void>((r) => requestAnimationFrame(() => r())))
                  .then(() =>
                    html2canvas(el, {
                      backgroundColor: null,
                      scale: 2,
                      useCORS: true,
                      logging: false,
                    }),
                  )
                  .then((canvas) => {
                    const a = document.createElement("a")
                    a.href = canvas.toDataURL("image/png")
                    a.download = `dashboard-${range}d${province ? `-${province}` : ""}.png`
                    a.click()
                  })
              }}
            >
              <ArrowDownToLine className="h-4 w-4" />
              导出PNG
            </Button>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <KpiCard
            label="用户数"
            value={formatInt(data.kpi.users)}
            sub={province ? "已按地区筛选估算" : "近似估算（示例数据）"}
            icon={<Users className="h-5 w-5" />}
          />
          <KpiCard
            label="转化率"
            value={formatPct(data.kpi.conversionRate)}
            sub="支付转化（示例口径）"
            icon={<Waypoints className="h-5 w-5" />}
          />
          <KpiCard
            label="日均收入"
            value={`¥ ${formatCny(data.kpi.avgDailyRevenue)}`}
            sub={`按 ${rangeLabel(range)} 计算`}
            icon={<Wallet className="h-5 w-5" />}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ChartCard
            className="lg:col-span-2"
            title="销售趋势"
            subtitle={`${rangeLabel(range)} · ${metric === "revenue" ? "销售额" : "订单量"}`}
            right={
              <div className="flex items-center gap-2">
                <SegmentedControl<TrendMetric>
                  value={metric}
                  options={[
                    { value: "revenue", label: "销售额" },
                    { value: "orders", label: "订单量" },
                  ]}
                  onChange={setMetric}
                  className="hidden sm:inline-flex"
                />
              </div>
            }
          >
            <TrendLine points={data.trend} metric={metric} />
          </ChartCard>

          <ChartCard
            title="地区分布"
            subtitle={province ? `已选：${province}（点击取消）` : "不同省份占比"}
            right={
              province ? (
                <Button variant="ghost" size="sm" onClick={() => setProvince(null)}>
                  清除
                </Button>
              ) : (
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70">
                  <Waypoints className="h-4 w-4" />
                </div>
              )
            }
          >
            <RegionPie
              slices={data.regions}
              selectedProvince={province}
              onSelectProvince={setProvince}
            />
          </ChartCard>
        </div>

        <div className="mt-4">
          <ChartCard
            title="用户活跃度热力图"
            subtitle={`日-小时分布 · 展示近 ${Math.min(range, 14)} 天`}
            right={
              <div className={cn("inline-flex items-center gap-2 rounded-xl px-2 py-1 text-xs text-white/55")}>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                  高活跃
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--muted)]" />
                  低活跃
                </span>
              </div>
            }
          >
            <ActivityHeatmap data={data.heatmap} />
          </ChartCard>
        </div>

        <footer className="mt-6 flex items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
              数据为示例 mock，可替换为真实接口
            </span>
          </div>
          <div className="inline-flex items-center gap-2">
            <span className="hidden sm:inline">Plotly</span>
            <Users className="h-4 w-4 opacity-60" />
          </div>
        </footer>
      </div>
    </div>
  )
}
