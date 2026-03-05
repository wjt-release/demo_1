export const plotTheme = {
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  font: {
    family: '"IBM Plex Sans", ui-sans-serif, system-ui',
    color: "rgba(255,255,255,0.82)",
    size: 12,
  },
  margin: { l: 48, r: 20, t: 10, b: 40 },
  xaxis: {
    gridcolor: "rgba(255,255,255,0.07)",
    zerolinecolor: "rgba(255,255,255,0.09)",
    tickfont: { color: "rgba(255,255,255,0.62)" },
  },
  yaxis: {
    gridcolor: "rgba(255,255,255,0.07)",
    zerolinecolor: "rgba(255,255,255,0.09)",
    tickfont: { color: "rgba(255,255,255,0.62)" },
  },
  legend: {
    font: { color: "rgba(255,255,255,0.65)" },
    bgcolor: "rgba(0,0,0,0)",
  },
} as const

export const plotConfig = {
  responsive: true,
  displaylogo: false,
  modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"],
} as const

