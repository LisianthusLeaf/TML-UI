import { toNumber } from './utils'
import type { HumanCaptchaCanvasTextStyle } from './types'

const defaultFontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

export const resolveCssVar = (el: Element, varName: string, fallback: string): string => {
  const value = getComputedStyle(el).getPropertyValue(varName).trim()
  return value || fallback
}

export const getTokenFontSize = (el: Element, varName: string, fallbackPx: number): number => {
  return toNumber(resolveCssVar(el, varName, String(fallbackPx)), fallbackPx)
}

export const renderTextCanvas = (params: {
  canvas: HTMLCanvasElement
  text: string
  maxWidthPx: number
  heightPx: number
  hostForVars: Element
  style?: HumanCaptchaCanvasTextStyle
  defaultVarColor: string
  defaultVarFontSize: string
}): void => {
  const {
    canvas,
    text,
    maxWidthPx,
    heightPx,
    hostForVars,
    style,
    defaultVarColor,
    defaultVarFontSize
  } = params

  const anyCanvas = canvas as unknown as {
    getContext?: (type: string) => CanvasRenderingContext2D | null
  }
  if (typeof anyCanvas.getContext !== 'function') return

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

  const color = style?.colorCss ?? resolveCssVar(hostForVars, defaultVarColor, '#303133')
  const fontSize = style?.fontSizePx ?? getTokenFontSize(hostForVars, defaultVarFontSize, 14)
  const fontWeight = style?.fontWeight ?? 600

  canvas.width = Math.max(1, Math.floor(maxWidthPx * dpr))
  canvas.height = Math.max(1, Math.floor(heightPx * dpr))
  canvas.style.width = `${maxWidthPx}px`
  canvas.style.height = `${heightPx}px`

  const ctx = anyCanvas.getContext('2d') as CanvasRenderingContext2D | null
  if (!ctx) return

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, maxWidthPx, heightPx)
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.font = `${fontWeight} ${fontSize}px ${defaultFontFamily}`

  const paddingX = 0
  const available = Math.max(1, maxWidthPx - paddingX * 2)

  // Simple single-line rendering with ellipsis if needed.
  const measure = (t: string): number => ctx.measureText(t).width
  let drawText = text
  if (measure(drawText) > available) {
    const ellipsis = '…'
    let left = 0
    let right = drawText.length
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      const candidate = drawText.slice(0, mid) + ellipsis
      if (measure(candidate) <= available) left = mid + 1
      else right = mid
    }
    drawText = drawText.slice(0, Math.max(0, left - 1)) + ellipsis
  }

  ctx.fillText(drawText, paddingX, heightPx / 2)
}
