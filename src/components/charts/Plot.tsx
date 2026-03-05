import PlotlyChart, { type PlotParams } from "react-plotly.js"

const baseLayout = {
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  font: { color: "rgba(255,255,255,0.82)" },
  margin: { l: 44, r: 18, t: 12, b: 42 },
  hoverlabel: {
    bgcolor: "rgba(18,18,22,0.92)",
    bordercolor: "rgba(255,255,255,0.10)",
    font: { color: "rgba(255,255,255,0.90)" },
  },
} as const

export function Plot(props: PlotParams) {
  return (
    <PlotlyChart
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
      config={{
        displaylogo: false,
        responsive: true,
        scrollZoom: false,
        modeBarButtonsToRemove: [
          "zoom2d",
          "select2d",
          "lasso2d",
          "pan2d",
          "autoScale2d",
          "resetScale2d",
          "zoomIn2d",
          "zoomOut2d",
          "hoverCompareCartesian",
        ],
      }}
      {...props}
      layout={{
        ...baseLayout,
        ...props.layout,
      }}
    />
  )
}

