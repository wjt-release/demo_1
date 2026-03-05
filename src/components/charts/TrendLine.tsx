import { Plot } from "@/components/charts/Plot"
import type { TrendMetric, TrendPoint } from "@/lib/mockData"
import { formatCny, formatInt } from "@/lib/mockData"

function axisBase() {
  return {
    tickfont: { color: "rgba(255,255,255,0.55)", size: 11 },
    linecolor: "rgba(255,255,255,0.08)",
    gridcolor: "rgba(255,255,255,0.06)",
    zeroline: false,
  } as const
}

export function TrendLine({
  points,
  metric,
  height = 320,
}: {
  points: TrendPoint[]
  metric: TrendMetric
  height?: number
}) {
  const x = points.map((p) => p.date.slice(5))
  const y = points.map((p) => (metric === "revenue" ? p.revenue : p.orders))
  const maxY = Math.max(...y)
  const maxIdx = y.findIndex((v) => v === maxY)

  const label = metric === "revenue" ? "销售额" : "订单量"
  const format = metric === "revenue" ? formatCny : formatInt

  return (
    <div style={{ height }}>
      <Plot
        data={[
          {
            x,
            y,
            type: "scatter",
            mode: "lines",
            line: { width: 2.5, color: "rgba(94,234,212,0.95)" },
            fill: "tozeroy",
            fillcolor: "rgba(94,234,212,0.10)",
            hovertemplate: `%{x}<br>${label}：<b>%{customdata}</b><extra></extra>`,
            customdata: y.map((v) => format(v)),
          },
          {
            x: maxIdx >= 0 ? [x[maxIdx]] : [],
            y: maxIdx >= 0 ? [y[maxIdx]] : [],
            type: "scatter",
            mode: "markers",
            marker: {
              size: 9,
              color: "rgba(245,158,11,0.95)",
              line: { color: "rgba(0,0,0,0.35)", width: 2 },
            },
            hovertemplate: `%{x}<br>峰值：<b>%{customdata}</b><extra></extra>`,
            customdata: maxIdx >= 0 ? [format(y[maxIdx])] : [],
          },
        ]}
        layout={{
          height,
          showlegend: false,
          margin: { l: 52, r: 18, t: 8, b: 42 },
          xaxis: {
            ...axisBase(),
            tickmode: "auto",
            ticks: "outside",
            tickcolor: "rgba(255,255,255,0.10)",
          },
          yaxis: {
            ...axisBase(),
            ticks: "outside",
            tickcolor: "rgba(255,255,255,0.10)",
          },
        }}
      />
    </div>
  )
}

