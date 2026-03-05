import "@testing-library/jest-dom/vitest"
import React from "react"
import { vi } from "vitest"

vi.mock("react-plotly.js", () => ({
  default: () => React.createElement("div", { "data-testid": "plotly" }),
}))
