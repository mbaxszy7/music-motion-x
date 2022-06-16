const formatAudioTime = (s: number) => {
  if (s) {
    const integerS = Math.round(s)
    const rs = integerS % 60
    const mm = (integerS - rs) / 60
    return `${`${mm}`.padStart(2, "0")}:${`${rs}`.padStart(2, "00")}`
  }
  return "00:00"
}

export default formatAudioTime
