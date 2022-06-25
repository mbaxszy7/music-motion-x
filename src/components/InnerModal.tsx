import { FC, ReactNode, useRef, useEffect, MouseEventHandler } from "react"
import ReactDOM from "react-dom"

const fake = () => {}

export const ModalMask: FC<{
  children?: ReactNode
  onClick?: MouseEventHandler
}> = ({ children, onClick }) => {
  return (
    <div
      className=" z-[9999999] fixed top-0 left-0 bottom-0 right-0 bg-mask bg-opacity-40"
      onClick={onClick || fake}
      data-testid="modal-mask"
    >
      {children}
    </div>
  )
}

const InnerModal: FC<{ isDynamic: boolean; children?: ReactNode }> = ({
  children,
  isDynamic,
}) => {
  const modalRoot = useRef<HTMLDivElement | null>(null)

  if (isDynamic && !modalRoot.current) {
    modalRoot.current = document.createElement("div")
    document.body.appendChild(modalRoot.current)
  } else {
    modalRoot.current = document.getElementById("modal_root") as HTMLDivElement
  }

  const el = useRef(document.createElement("div"))

  const modalCleanup = () => {
    document.querySelector("html, body")!.classList.remove("no_scroll")
    try {
      modalRoot.current!.removeChild(el.current)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    const elContainer = el.current
    if (modalRoot.current && elContainer) {
      document.querySelector("html, body")!.classList.add("no_scroll")
      modalRoot.current.appendChild(elContainer)
      window.addEventListener("beforeunload", modalCleanup)
    }
    return () => {
      document.querySelector("html, body")!.classList.remove("no_scroll")
      try {
        modalRoot.current?.removeChild(elContainer)
      } catch (e) {
        console.error(e)
      }
      window.removeEventListener("beforeunload", modalCleanup)
    }
  }, [])

  return ReactDOM.createPortal(children, el.current)
}

export default InnerModal
