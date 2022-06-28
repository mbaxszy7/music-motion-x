import { render, RenderOptions } from "@testing-library/react"
import { ReactElement } from "react"

const renderWithRoot = (ui: ReactElement, opts?: RenderOptions) => {
  const root = document.createElement("div")
  root.id = "root"

  root.setAttribute("data-testid", "test-root")

  const view = render(ui, {
    ...(opts ?? {}),
    container: document.body.appendChild(root),
  })

  return view
}

export default renderWithRoot
