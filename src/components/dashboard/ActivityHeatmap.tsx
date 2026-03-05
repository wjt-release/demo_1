import Plot from "react-plotly.js"
import { plotConfig, plotTheme } from "@/components/dashboard/plotTheme"

export default function ActivityHeatmap({
  days,
  hours,
  values,
}: {
  days: string[]
  hours: number[]
  values: number[][]
}) {
  return (
    <div className="h-[360px] w-full">
      <Plot
        data={[
          {
            type: "heatmap",
            x: hours,
            y: days,
            z: values,
            hovertemplate: "%{y} %{x}点<br>活跃度：%{z}<extra></extra>",
            colorscale: [
              [0, "rgba(2,6,23,0.0)"],
              [0.12, "rgba(15,23,42,0.65)"],
              [0.35, "rgba(34,211,238,0.35)"],
              [0.6, "rgba(99,102,241,0.42)"],
              [0.85, "rgba(16,185,129,0.55)"],
              [1, "rgba(251,191,36,0.68)"],
            ],
            showscale: true,
            colorbar: {
              thickness: 10,
              outlinewidth: 0,
              tickfont: { color: "rgba(255,255,255,0.55)", size: 10 },
              xpad: 10,
            },
          },
        ]}
        layout={{
          ...plotTheme,
          height: 360,
          margin: { l: 64, r: 38, t: 10, b: 46 },
          xaxis: { ...plotTheme.xaxis, title: { text: "小时", font: { color: "rgba(255,255,255,0.55)", size: 11 } } },
          yaxis: { ...plotTheme.yaxis, title: { text: "星期", font: { color: "rgba(255,255,255,0.55)", size: 11 } } },
        }}
        config={plotConfig}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

