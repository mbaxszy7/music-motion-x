import clearIcon from "@/assets/clear.png"
import Dialog from "@/components/Dialog"
import { useState } from "react"

const LastSearchHistory = ({ setValue }: { setValue: (s: string) => void }) => {
  const [searchHistory, setSearchHistory] = useState(["hello", "world"])

  const [isShowDialog, setShowDialog] = useState(false)
  if (!searchHistory.length) return null
  return (
    <div className=" mt-6 relative ml-1 z-[100]">
      {isShowDialog && (
        <Dialog
          title="搜索历史"
          dialogText="确认清空搜索历史？"
          onCancelClick={() => setShowDialog(false)}
          onConfirmClick={() => {
            setSearchHistory([])
            setShowDialog(false)
          }}
        />
      )}
      <div className=" text-dg">最近搜索</div>
      {searchHistory.map((item) => (
        <div
          key={item}
          className=" mt-3 text-base text-fg pl-1"
          onClick={() => setValue(item)}
        >
          {item}
        </div>
      ))}

      <div
        className=" mt-6 text-fg text-sm relative inline-block left-1/2 -translate-x-1/2 bg-no-repeat bg-[length:16px_16px] px-6 py-2 bg-black rounded-[200px] indent-5"
        style={{
          backgroundImage: `url(${clearIcon})`,
          backgroundPosition: "21px center",
        }}
        onClick={() => setShowDialog(true)}
      >
        清空历史
      </div>
    </div>
  )
}

export default LastSearchHistory
