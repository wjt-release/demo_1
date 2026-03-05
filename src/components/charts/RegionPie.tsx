import { Plot } from "@/components/charts/Plot"
import type { RegionSlice } from "@/lib/mockData"
import { formatPct } from "@/lib/mockData"

const COLORS = [
  "rgba(94,234,212,0.95)",
  "rgba(56,189,248,0.92)",
  "rgba(167,139,250,0.90)",
  "rgba(244,114,182,0.88)",
  "rgba(245,158,11,0.92)",
  "rgba(34,211,238,0.88)",
  "rgba(148,163,184,0.80)",
  "rgba(192,132,252,0.82)",
  "rgba(74,222,128,0.82)",
  "rgba(251,113,133,0.82)",
]

export function RegionPie({
  slices,
  selectedProvince,
  onSelectProvince,
  height = 320,
}: {
  slices: RegionSlice[]
  selectedProvince: string | null
  onSelectProvince: (province: string | null) => void
  height?: number
}) {
  const labels = slices.map((s) => s.province)
  const values = slices.map((s) => s.value)
  const pull = slices.map((s) => (selectedProvince && s.province === selectedProvince ? 0.08 : 0))

  return (
    <div style={{ height }}>
      <Plot
        data={[
          {
            type: "pie",
            labels,
            values,
            sort: false,
            direction: "clockwise",
            hole: 0.62,
            textinfo: "none",
            marker: {
              colors: labels.map((_, i) => COLORS[i % COLORS.length]),
              line: { color: "rgba(0,0,0,0.35)", width: 1 },
            },
            pull,
            hovertemplate: `%{label}<br>占比：<b>%{customdata}</b><extra></extra>`,
            customdata: values.map((v) => formatPct(v)),
          },
        ]}
        layout={{
          height,
          margin: { l: 8, r: 8, t: 8, b: 8 },
          showlegend: true,
          legend: {
            orientation: "v",
            x: 1,
            y: 0.5,
            xanchor: "right",
            yanchor: "middle",
            font: { color: "rgba(255,255,255,0.65)", size: 11 },
            itemclick: false,
            itemdoubleclick: false,
          },
        }}
        onClick={(ev) => {
          const p = ev?.points?.[0]
          const next = typeof p?.label === "string" ? p.label : null
          onSelectProvince(next && next !== selectedProvince ? next : null)
        }}
      />
    </div>
  )
}

