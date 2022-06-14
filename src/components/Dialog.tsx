import { FC } from "react"
import InnerModal, { ModalMask } from "./InnerModal"

const Dialog: FC<{
  title: string
  dialogText: string
  onCancelClick: () => void
  onConfirmClick: () => void
}> = ({
  title,
  dialogText,

  onCancelClick,
  onConfirmClick,
}) => {
  return (
    <InnerModal isDynamic={false}>
      <ModalMask>
        <div
          className=" mx-auto w-3/4 rounded-lg bg-mg pt-7 pr-4 pb-4 pl-4 max-w-xs mt-[30vh] 
         mb-0"
        >
          {title && (
            <p className="title leading-normal text-base mb-4 text-center text-fg">
              {title}
            </p>
          )}
          {dialogText && (
            <p className="alert_text title leading-normal text-base mb-4 text-center text-fg">
              {dialogText}
            </p>
          )}
          <div className="btn_group flex mt-7 ">
            {onCancelClick && (
              <span
                className=" text-sm text-center inline-block flex-1 text-fg"
                onClick={onCancelClick}
              >
                取消
              </span>
            )}
            {onConfirmClick && (
              <span
                className="confirm text-secondary text-sm text-center inline-block flex-1"
                onClick={onConfirmClick}
              >
                确定
              </span>
            )}
          </div>
        </div>
      </ModalMask>
    </InnerModal>
  )
}

export default Dialog
