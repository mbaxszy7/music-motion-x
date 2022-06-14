const clamp = (num: number, min: number, max: number) => {
  if (num < min) return min
  if (num > max) return max
  return num
}

export default clamp
