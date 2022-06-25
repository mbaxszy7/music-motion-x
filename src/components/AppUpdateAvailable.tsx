import useIsomorphicEffect from "@/hooks/useIsomorphicEffect"
import { useCallback, useState } from "react"
import Dialog from "@/components/Dialog"

const AppUpdateAvailable = () => {
  const [isShowDialog, setShowDialog] = useState(false)

  const handleOnLoad = useCallback(() => {
    // @ts-ignore
    window.isUpdateAvailable.then((isAvailable: boolean) => {
      setShowDialog(isAvailable)
    })
  }, [])

  useIsomorphicEffect(() => {
    window.addEventListener("load", handleOnLoad)
    return () => {
      window.removeEventListener("load", handleOnLoad)
    }
  }, [])

  const forceSWupdate = useCallback(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update()
      })
    }
  }, [])

  const handlePageViewChange = useCallback(() => {
    console.info("handlePageViewChange", !document.hidden)
    if (!document.hidden) {
      forceSWupdate()
    }
  }, [forceSWupdate])

  useIsomorphicEffect(() => {
    window.addEventListener("visibilitychange", handlePageViewChange)
    return () => {
      window.removeEventListener("visibilitychange", handlePageViewChange)
    }
  }, [])

  return (
    <>
      {isShowDialog && (
        <Dialog
          dialogText="有新版本可用，是否更新？"
          onCancelClick={() => setShowDialog(false)}
          onConfirmClick={() => {
            window.location.reload()
          }}
        />
      )}
    </>
  )
}

export default AppUpdateAvailable
