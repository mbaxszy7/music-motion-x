import { render } from "@testing-library/react"
import { ReactElement } from "react"

const renderWithModalRoot = (ui: ReactElement) => {
  const modalRoot = document.createElement("div")
  modalRoot.id = "modal_root"

  const view = render(ui, {
    container: document.body.appendChild(modalRoot),
  })

  return view
}

export default renderWithModalRoot
