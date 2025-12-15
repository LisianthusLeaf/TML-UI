import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createHumanCaptcha } from '../src/human-captcha-modal'

const flush = async (): Promise<void> => {
  await Promise.resolve()
}

const installCanvasMock = (): void => {
  if (typeof (HTMLCanvasElement.prototype as any).getContext === 'function') return
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: () => {
      return {
        setTransform: vi.fn(),
        clearRect: vi.fn(),
        fillText: vi.fn(),
        measureText: (t: string) => ({ width: t.length * 8 }),
        font: '',
        fillStyle: '',
        textBaseline: ''
      } as any
    }
  })
}

describe('human-captcha-modal', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    installCanvasMock()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('verify() 会创建弹窗并返回 Promise', async () => {
    const beforeCount = document.body.childElementCount

    const captcha = createHumanCaptcha({
      antiAutomation: { minSolveTimeMs: 0, requirePointerTravelPx: 0 }
    })

    const promise = captcha.verify()
    expect(promise).toBeInstanceOf(Promise)
    expect(document.body.childElementCount).toBe(beforeCount + 1)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await expect(promise).resolves.toBe(false)

    expect(document.body.childElementCount).toBe(beforeCount)
  })

  it('默认使用 closed ShadowRoot（best-effort）', () => {
    const captcha = createHumanCaptcha({
      antiAutomation: { minSolveTimeMs: 0, requirePointerTravelPx: 0 }
    })

    const promise = captcha.verify()

    const host = document.body.lastElementChild as HTMLElement
    expect(host).toBeTruthy()
    expect((host as any).shadowRoot).toBeNull()

    // cleanup
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    return expect(promise).resolves.toBe(false)
  })

  it('通过 click-button challenge 后 resolve 为 true；取消为 false', async () => {
    // Make shadow root open so tests can query inside.
    const originalAttachShadow = HTMLElement.prototype.attachShadow
    vi.spyOn(HTMLElement.prototype, 'attachShadow').mockImplementation(function (
      this: HTMLElement,
      init
    ) {
      return originalAttachShadow.call(this, { ...init, mode: 'open' })
    })

    installCanvasMock()

    const captcha = createHumanCaptcha({
      antiAutomation: { minSolveTimeMs: 0, requirePointerTravelPx: 0 }
    })

    const promise = captcha.verify()

    const host = document.body.lastElementChild as HTMLElement
    const shadow = (host as any).shadowRoot as ShadowRoot
    expect(shadow).toBeTruthy()

    const button = shadow.querySelector('button') as HTMLButtonElement
    expect(button).toBeTruthy()

    button.click()
    await expect(promise).resolves.toBe(true)

    // cancel path
    const captcha2 = createHumanCaptcha({
      antiAutomation: { minSolveTimeMs: 0, requirePointerTravelPx: 0 }
    })
    const promise2 = captcha2.verify()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await expect(promise2).resolves.toBe(false)
  })

  it('随机定位会 clamp 到视口内', async () => {
    const originalAttachShadow = HTMLElement.prototype.attachShadow
    vi.spyOn(HTMLElement.prototype, 'attachShadow').mockImplementation(function (
      this: HTMLElement,
      init
    ) {
      return originalAttachShadow.call(this, { ...init, mode: 'open' })
    })

    installCanvasMock()

    Object.defineProperty(window, 'innerWidth', { value: 320, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 240, configurable: true })

    const captcha = createHumanCaptcha({
      antiAutomation: { minSolveTimeMs: 0, requirePointerTravelPx: 0 },
      size: { widthPx: 300, heightPx: 220 },
      position: { centerJitterPx: 9999, clampMarginPx: 12 }
    })

    const promise = captcha.verify()

    const host = document.body.lastElementChild as HTMLElement
    const shadow = (host as any).shadowRoot as ShadowRoot
    const dialog = shadow.querySelector('[role="dialog"]') as HTMLElement

    const left = Number.parseFloat(dialog.style.left)
    const top = Number.parseFloat(dialog.style.top)

    expect(left).toBeGreaterThanOrEqual(12)
    expect(top).toBeGreaterThanOrEqual(12)
    expect(left).toBeLessThanOrEqual(12)
    expect(top).toBeLessThanOrEqual(12)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await expect(promise).resolves.toBe(false)
  })

  it('canvas 模式下，文案不会以 DOM text node 出现在页面文本中', async () => {
    const uniqueTitle = 'UNIQUE_TITLE_123'
    const uniqueMessage = 'UNIQUE_MESSAGE_456'
    const uniqueButton = 'UNIQUE_BUTTON_789'

    const captcha = createHumanCaptcha({
      antiAutomation: { minSolveTimeMs: 0, requirePointerTravelPx: 0 },
      text: { title: uniqueTitle, message: uniqueMessage, buttonLabel: uniqueButton }
    })

    const promise = captcha.verify()
    await flush()

    expect(document.body.textContent || '').not.toContain(uniqueTitle)
    expect(document.body.textContent || '').not.toContain(uniqueMessage)
    expect(document.body.textContent || '').not.toContain(uniqueButton)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await expect(promise).resolves.toBe(false)
  })

  it('anti-automation: minSolveTimeMs 门槛生效', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(0)

    const originalAttachShadow = HTMLElement.prototype.attachShadow
    vi.spyOn(HTMLElement.prototype, 'attachShadow').mockImplementation(function (
      this: HTMLElement,
      init
    ) {
      return originalAttachShadow.call(this, { ...init, mode: 'open' })
    })

    installCanvasMock()

    const captcha = createHumanCaptcha({
      antiAutomation: { minSolveTimeMs: 1000, requirePointerTravelPx: 0 }
    })

    const promise = captcha.verify()

    const host = document.body.lastElementChild as HTMLElement
    const shadow = (host as any).shadowRoot as ShadowRoot
    const button = shadow.querySelector('button') as HTMLButtonElement

    let settled = false
    promise.then(() => {
      settled = true
    })

    button.click()
    await flush()
    expect(settled).toBe(false)

    vi.advanceTimersByTime(1000)
    vi.setSystemTime(1000)

    button.click()
    await expect(promise).resolves.toBe(true)
  })

  it('challenge 可替换（自定义 challenge 注入）', async () => {
    const called = vi.fn()

    const captcha = createHumanCaptcha({
      antiAutomation: { minSolveTimeMs: 0, requirePointerTravelPx: 0 },
      challenge: {
        type: 'custom',
        factory: (ctx) => {
          called()
          ctx.requestSolve()
          return { destroy: vi.fn() }
        }
      }
    })

    await expect(captcha.verify()).resolves.toBe(true)
    expect(called).toHaveBeenCalledTimes(1)
  })
})
