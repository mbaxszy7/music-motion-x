/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from "react"

const Label = ({
  text,
  style,
}: {
  text: string
  style?: React.CSSProperties
}) => {
  return (
    <span
      className=" absolute py-[6px] px-3 rounded-[200px] bg-secondary text-[12px] text-black bottom-[14px] right-[10px] font-bold leading-none"
      style={style ?? {}}
    >{`#${text}`}</span>
  )
}

export default Label
