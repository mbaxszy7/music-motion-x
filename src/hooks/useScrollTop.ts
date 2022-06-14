import useIsomorphicEffect from "./useIsomorphicEffect"

const useRootScrollTop = () => {
  useIsomorphicEffect(() => {
    document.getElementById("root")!.scrollTo({
      top: 0,
    })
  }, [])
}

export default useRootScrollTop
