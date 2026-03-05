import { useMemo } from "react"
import Plot from "react-plotly.js"
import { plotConfig, plotTheme } from "@/components/dashboard/plotTheme"

export default function RegionPie({
  items,
}: {
  items: { province: string; revenue: number }[]
}) {
  const { labels, values } = useMemo(() => {
    return {
      labels: items.map((i) => i.province),
      values: items.map((i) => i.revenue),
    }
  }, [items])

  return (
    <div className="h-[300px] w-full">
      <Plot
        data={[
          {
            type: "pie",
            labels,
            values,
            hole: 0.52,
            sort: false,
            direction: "clockwise",
            textinfo: "none",
            hovertemplate: "%{label}<br>收入：%{value:,} 元<br>占比：%{percent}<extra></extra>",
            marker: {
              line: { color: "rgba(255,255,255,0.08)", width: 1 },
              colors: [
                "rgba(56,189,248,0.95)",
                "rgba(99,102,241,0.9)",
                "rgba(16,185,129,0.9)",
                "rgba(251,191,36,0.85)",
                "rgba(244,114,182,0.85)",
                "rgba(148,163,184,0.85)",
                "rgba(34,211,238,0.65)",
                "rgba(129,140,248,0.65)",
                "rgba(52,211,153,0.65)",
                "rgba(250,204,21,0.65)",
              ],
            },
          },
        ]}
        layout={{
          ...plotTheme,
          height: 300,
          margin: { l: 16, r: 16, t: 10, b: 10 },
          showlegend: true,
          legend: { ...plotTheme.legend, orientation: "h", y: -0.05, x: 0, xanchor: "left" },
        }}
        config={plotConfig}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

