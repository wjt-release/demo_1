export type RangeDays = 7 | 30 | 90

export type TrendMetric = "revenue" | "orders"

export type KpiData = {
  users: number
  conversionRate: number
  avgDailyRevenue: number
}

export type TrendPoint = {
  date: string
  revenue: number
  orders: number
}

export type RegionSlice = {
  province: string
  value: number
}

export type HeatmapData = {
  days: string[]
  hours: number[]
  z: number[][]
}

export type DashboardData = {
  kpi: KpiData
  trend: TrendPoint[]
  regions: RegionSlice[]
  heatmap: HeatmapData
}

function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), t | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function round(n: number, digits = 0) {
  const p = 10 ** digits
  return Math.round(n * p) / p
}

function formatDayKey(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function formatDayLabel(d: Date) {
  return new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit" }).format(d)
}

function lastNDays(n: number) {
  const out: { key: string; label: string; date: Date }[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    out.push({ key: formatDayKey(d), label: formatDayLabel(d), date: d })
  }
  return out
}

const DEFAULT_PROVINCES = [
  "广东",
  "江苏",
  "浙江",
  "山东",
  "河南",
  "四川",
  "湖北",
  "福建",
  "北京",
  "上海",
]

export function buildDashboardData(range: RangeDays, seed: number): DashboardData {
  const rng = mulberry32(seed)

  const provinces = DEFAULT_PROVINCES.slice()
  const regionRaw = provinces.map(() => 0.25 + rng() * 1.75)
  const regionSum = regionRaw.reduce((a, b) => a + b, 0)
  const regions: RegionSlice[] = provinces
    .map((p, i) => ({ province: p, value: regionRaw[i] / regionSum }))
    .sort((a, b) => b.value - a.value)

  const days = lastNDays(range)
  const weekly = [0.92, 0.98, 1.01, 1.03, 1.06, 1.12, 1.08]
  const base = 820000 + rng() * 240000
  const drift = (rng() - 0.5) * 0.012

  const trend: TrendPoint[] = days.map((d, i) => {
    const wd = d.date.getDay()
    const season = weekly[wd]
    const wave = 1 + 0.08 * Math.sin((i / 6) * Math.PI)
    const noise = 1 + (rng() - 0.5) * 0.18
    const revenue = base * season * wave * noise * (1 + drift * i)
    const orders = Math.round(revenue / (96 + rng() * 34))
    return {
      date: d.key,
      revenue: Math.round(revenue),
      orders,
    }
  })

  const revenueTotal = trend.reduce((sum, p) => sum + p.revenue, 0)
  const users = Math.round(68000 + rng() * 52000)
  const conversionRate = round(clamp(0.012 + rng() * 0.038, 0.008, 0.065), 4)
  const avgDailyRevenue = Math.round(revenueTotal / range)

  const heatmapDays = lastNDays(Math.min(range, 14)).map((d) => d.label)
  const hours = Array.from({ length: 24 }).map((_, i) => i)
  const z = heatmapDays.map((_, di) => {
    const dayBias = 0.92 + rng() * 0.22
    return hours.map((h) => {
      const noon = Math.exp(-((h - 12) ** 2) / 22)
      const evening = Math.exp(-((h - 20) ** 2) / 18)
      const night = Math.exp(-((h - 1) ** 2) / 26)
      const baseActive = 14 + 72 * noon + 88 * evening + 22 * night
      const noise = (rng() - 0.5) * 14
      return Math.max(0, Math.round((baseActive + noise) * dayBias))
    })
  })

  return {
    kpi: { users, conversionRate, avgDailyRevenue },
    trend,
    regions,
    heatmap: { days: heatmapDays, hours, z },
  }
}

export function applyProvinceFilter(data: DashboardData, province: string | null): DashboardData {
  if (!province) return data
  const slice = data.regions.find((r) => r.province === province)
  if (!slice) return data

  const f = clamp(0.55 + slice.value * 1.25, 0.6, 1.35)
  return {
    kpi: {
      users: Math.round(data.kpi.users * f),
      conversionRate: clamp(data.kpi.conversionRate * (0.92 + slice.value * 0.65), 0, 1),
      avgDailyRevenue: Math.round(data.kpi.avgDailyRevenue * f),
    },
    trend: data.trend.map((p) => ({
      ...p,
      revenue: Math.round(p.revenue * f),
      orders: Math.round(p.orders * f),
    })),
    regions: data.regions,
    heatmap: {
      ...data.heatmap,
      z: data.heatmap.z.map((row) => row.map((v) => Math.round(v * f))),
    },
  }
}

export function formatCny(n: number) {
  const abs = Math.abs(n)
  if (abs >= 1e8) return `${round(n / 1e8, 2)}亿`
  if (abs >= 1e4) return `${round(n / 1e4, 2)}万`
  return new Intl.NumberFormat("zh-CN").format(Math.round(n))
}

export function formatInt(n: number) {
  return new Intl.NumberFormat("zh-CN").format(Math.round(n))
}

export function formatPct(n: number) {
  return `${round(n * 100, 2)}%`
}
