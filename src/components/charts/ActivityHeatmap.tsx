import { Plot } from "@/components/charts/Plot"
import type { HeatmapData } from "@/lib/mockData"

function axisBase() {
  return {
    tickfont: { color: "rgba(255,255,255,0.55)", size: 10 },
    linecolor: "rgba(255,255,255,0.08)",
    gridcolor: "rgba(255,255,255,0.04)",
    zeroline: false,
  } as const
}

const colorscale: [number, string][] = [
  [0, "rgba(16,16,20,1)"],
  [0.18, "rgba(15,73,92,0.95)"],
  [0.46, "rgba(34,211,238,0.90)"],
  [0.72, "rgba(94,234,212,0.92)"],
  [1, "rgba(245,158,11,0.95)"],
]

export function ActivityHeatmap({
  data,
  height = 360,
}: {
  data: HeatmapData
  height?: number
}) {
  const x = data.hours.map((h) => String(h).padStart(2, "0"))
  const y = data.days

  return (
    <div style={{ height }}>
      <Plot
        data={[
          {
            type: "heatmap",
            x,
            y,
            z: data.z,
            colorscale,
            hoverongaps: false,
            xgap: 1,
            ygap: 1,
            colorbar: {
              thickness: 10,
              len: 0.65,
              outlinewidth: 0,
              tickfont: { color: "rgba(255,255,255,0.45)", size: 10 },
            },
            hovertemplate: "日期：%{y}<br>小时：%{x}<br>活跃：<b>%{z}</b><extra></extra>",
          },
        ]}
        layout={{
          height,
          margin: { l: 62, r: 28, t: 8, b: 44 },
          xaxis: {
            ...axisBase(),
            ticks: "outside",
            tickcolor: "rgba(255,255,255,0.10)",
            title: { text: "小时", font: { color: "rgba(255,255,255,0.40)", size: 11 } },
          },
          yaxis: {
            ...axisBase(),
            ticks: "outside",
            tickcolor: "rgba(255,255,255,0.10)",
            title: { text: "日期", font: { color: "rgba(255,255,255,0.40)", size: 11 } },
          },
        }}
      />
    </div>
  )
}

