import { render, RenderOptions } from "@testing-library/react"
import { ReactElement } from "react"

const renderWithModalRoot = (ui: ReactElement, opts?: RenderOptions) => {
  const modalRoot = document.createElement("div")
  modalRoot.id = "modal_root"

  const view = render(ui, {
    ...(opts ?? {}),
    container: document.body.appendChild(modalRoot),
  })

  return view
}

export default renderWithModalRoot
