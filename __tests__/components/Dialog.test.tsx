import { fireEvent, render, screen } from "@testing-library/react"
import Dialog from "../../src/components/Dialog"

it("worked with full props", () => {
  const onCancelClick = jest.fn()
  const onConfirmClick = jest.fn()
  const modalRoot = document.createElement("div")
  modalRoot.id = "modal_root"
  render(
    <Dialog
      title="test"
      dialogText="test Text"
      onCancelClick={onCancelClick}
      onConfirmClick={onConfirmClick}
    />,
    {
      container: document.body.appendChild(modalRoot),
    },
  )

  fireEvent.click(screen.getByTestId("cancel-dialog"))
  fireEvent.click(screen.getByTestId("confirm-dialog"))
  expect(onCancelClick).toHaveBeenCalledTimes(1)
  expect(onConfirmClick).toHaveBeenCalledTimes(1)
})
