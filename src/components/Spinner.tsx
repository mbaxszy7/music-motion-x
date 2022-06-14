import { memo, CSSProperties } from "react"

const Spinner = memo(({ style }: { style?: CSSProperties }) => {
  return (
    <div
      style={{ ...(style || {}) }}
      className=" w-16 h-16 z-[10000] relative my-0 mx-auto mb-0 "
    >
      <div className="bounce w-full h-full rounded-full bg-secondary opacity-60 absolute top-0 left-0 animate-spin-loading" />
      <div
        className="bounce  w-full h-full rounded-full bg-secondary opacity-60 absolute top-0 left-0 animate-spin-loading"
        style={{ animationDelay: "-1s" }}
      />
    </div>
  )
})

Spinner.displayName = "Spinner"

export default Spinner
