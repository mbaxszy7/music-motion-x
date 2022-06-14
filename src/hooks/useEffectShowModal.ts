import { useCallback, useEffect, useRef, useState } from "react"

const useEffectShowModal = () => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowContent, setIsShowContent] = useState(false)
  const onModalCloseTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )

  const onModalClose = useCallback(() => {
    setIsShowContent(false)

    const id = setTimeout(() => {
      setIsShowModal(false)
    }, 300)
    onModalCloseTimeoutId.current = id
  }, [])

  useEffect(() => {
    return () => {
      onModalCloseTimeoutId.current &&
        clearTimeout(onModalCloseTimeoutId.current)
    }
  }, [])

  const onModalOpen = useCallback(() => {
    setIsShowModal(true)
  }, [])

  useEffect(() => {
    let id: ReturnType<typeof setTimeout> | null = null
    if (isShowModal) {
      id = setTimeout(() => setIsShowContent(true), 0)
    }
    return () => {
      id && clearTimeout(id)
    }
  }, [isShowModal])

  return { isShowModal, isShowContent, onModalOpen, onModalClose }
}

export default useEffectShowModal
