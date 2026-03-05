type SalesPoint = { date: string; revenue: number }
type RegionPoint = { province: string; revenue: number }

export type DashboardData = {
  kpi: {
    users: number
    conversionRate: number
    avgDailyRevenue: number
  }
  salesTrend: SalesPoint[]
  regionShare: RegionPoint[]
  activity: {
    days: string[]
    hours: number[]
    values: number[][]
  }
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

function formatYmd(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export function makeDashboardData(seed = 42): DashboardData {
  const rng = mulberry32(seed)

  const today = new Date()
  const salesTrend: SalesPoint[] = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (29 - i))
    const dayOfWeek = d.getDay()
    const weekendBoost = dayOfWeek === 0 || dayOfWeek === 6 ? 1.12 : 0.98
    const base = 82000 + i * 420
    const noise = (rng() - 0.5) * 14000
    const spike = rng() > 0.92 ? 18000 + rng() * 22000 : 0
    const revenue = Math.max(22000, Math.round((base + noise + spike) * weekendBoost))
    return { date: formatYmd(d), revenue }
  })

  const provinces = ["广东", "江苏", "浙江", "山东", "四川", "湖北", "河南", "福建", "北京", "上海"]
  const weights = provinces.map(() => 0.4 + rng() * 1.6)
  const weightSum = weights.reduce((a, b) => a + b, 0)
  const totalRevenue = salesTrend.reduce((a, b) => a + b.revenue, 0)
  const regionShare: RegionPoint[] = provinces.map((p, idx) => ({
    province: p,
    revenue: Math.round((weights[idx] / weightSum) * totalRevenue),
  }))

  const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  const hours = Array.from({ length: 24 }).map((_, i) => i)
  const values = days.map((_, di) =>
    hours.map((h) => {
      const midday = Math.exp(-Math.pow((h - 13) / 4.2, 2))
      const evening = 0.75 * Math.exp(-Math.pow((h - 20) / 3.3, 2))
      const workdayBoost = di <= 4 ? 1.12 : 0.9
      const baseline = 8 + rng() * 6
      const intensity = (midday + evening) * 62 * workdayBoost + baseline + (rng() - 0.5) * 10
      return Math.max(0, Math.round(intensity))
    }),
  )

  const users = Math.round(120_000 + rng() * 48_000)
  const conversionRate = Math.round((0.032 + rng() * 0.018) * 10_000) / 10_000
  const avgDailyRevenue = Math.round(totalRevenue / salesTrend.length)

  return {
    kpi: { users, conversionRate, avgDailyRevenue },
    salesTrend,
    regionShare,
    activity: { days, hours, values },
  }
}
