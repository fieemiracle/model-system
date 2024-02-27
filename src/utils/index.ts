function formatOpcity (opacity: number) {
  // 0.1 - 0.9
  if (opacity < 0.1) return 0.1
  if (opacity > 0.9) return 0.9
  return opacity
}
export function generateColor (opacity: number) {
  const colors = [
    `rgba(104,222,122,${ formatOpcity(opacity) })`,
    `rgba(239,65,70,${ formatOpcity(opacity) })`
  ]
  // opacity > 0.5用绿色，opacity <= 0.5用粉色
  const type = opacity > 0.5 ? 0 : 1
  return colors[type]
}