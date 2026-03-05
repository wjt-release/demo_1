import { useMemo } from "react"
import Plot from "react-plotly.js"
import { plotConfig, plotTheme } from "@/components/dashboard/plotTheme"

export default function SalesTrendLine({
  points,
}: {
  points: { date: string; revenue: number }[]
}) {
  const { x, y } = useMemo(() => {
    return {
      x: points.map((p) => p.date),
      y: points.map((p) => p.revenue),
    }
  }, [points])

  return (
    <div className="h-[300px] w-full">
      <Plot
        data={[
          {
            type: "scatter",
            mode: "lines",
            x,
            y,
            line: { color: "rgba(34,211,238,0.95)", width: 3 },
            hovertemplate: "%{x}<br>收入：%{y:,} 元<extra></extra>",
          },
          {
            type: "scatter",
            mode: "markers",
            x,
            y,
            marker: { color: "rgba(34,211,238,0.85)", size: 5, line: { color: "rgba(0,0,0,0)", width: 0 } },
            hoverinfo: "skip",
          },
        ]}
        layout={{
          ...plotTheme,
          height: 300,
          margin: { ...plotTheme.margin, b: 36 },
          xaxis: { ...plotTheme.xaxis, tickangle: 0, tickmode: "auto", nticks: 6 },
          yaxis: { ...plotTheme.yaxis, tickformat: ",", ticksuffix: " " },
        }}
        config={plotConfig}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

