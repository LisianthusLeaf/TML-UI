export const clamp = (value: number, min: number, max: number): number => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export const randomBetween = (min: number, max: number): number => {
  return min + Math.random() * (max - min)
}

export const createToken = (): string => {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

export const toNumber = (value: string, fallback: number): number => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}
