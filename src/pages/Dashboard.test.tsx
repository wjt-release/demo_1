import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Dashboard from "@/pages/Dashboard"
import { describe, expect, it } from "vitest"

describe("Dashboard", () => {
  it("renders key modules", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    )

    expect(screen.getByRole("heading", { name: "销售数据看板" })).toBeInTheDocument()
    expect(screen.getByText("用户数")).toBeInTheDocument()
    expect(screen.getByText("转化率")).toBeInTheDocument()
    expect(screen.getByText("日均收入")).toBeInTheDocument()
    expect(screen.getByText("销售趋势")).toBeInTheDocument()
    expect(screen.getByText("地区分布")).toBeInTheDocument()
    expect(screen.getByText("用户活跃度")).toBeInTheDocument()
  })
})
