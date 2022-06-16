/* eslint-disable react/prop-types */
import { memo, CSSProperties, FC } from "react"

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

export const SpinnerLoading: FC<{ style?: CSSProperties; color: string }> =
  memo(({ style, color }) => {
    return (
      <div className=" inline-block relative" style={style ?? {}}>
        <div
          className=" box-border block absolute w-full h-full rounded-[50%]  animate-ring-spin-loading "
          style={{
            border: ` 3px solid ${color}`,
            borderColor: `${color} transparent transparent transparent`,
            animationDelay: "-0.45s",
          }}
        />
        <div
          className=" box-border block absolute w-full h-full rounded-[50%]  animate-ring-spin-loading "
          style={{
            border: ` 3px solid ${color}`,
            borderColor: `${color} transparent transparent transparent`,
            animationDelay: "-0.3s",
          }}
        />
        <div
          className=" box-border block absolute w-full h-full rounded-[50%]  animate-ring-spin-loading "
          style={{
            border: ` 3px solid ${color}`,
            borderColor: `${color} transparent transparent transparent`,
            animationDelay: "-0.15s",
          }}
        />
        <div
          className=" box-border block absolute w-full h-full rounded-[50%]  animate-ring-spin-loading "
          style={{
            border: ` 3px solid ${color}`,
            borderColor: `${color} transparent transparent transparent`,
          }}
        />
      </div>
    )
  })

SpinnerLoading.displayName = "SpinnerLoading"

export default Spinner
