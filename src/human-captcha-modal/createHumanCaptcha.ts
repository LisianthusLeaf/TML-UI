import type {
  HumanCaptchaInstance,
  HumanCaptchaOptions,
  HumanCaptchaChallengeHandle,
  HumanCaptchaChallengeContext,
  HumanCaptchaChallengeOption
} from './types'
import { clamp, createToken, randomBetween } from './utils'
import { renderTextCanvas } from './canvasText'
import { mountClickButtonChallenge } from './challenges/clickButton'

type CleanupFn = () => void

const defaults = {
  text: {
    title: '安全校验',
    message: '请点击下方按钮完成验证',
    buttonLabel: '我不是机器人'
  },
  position: {
    centerJitterPx: 120,
    clampMarginPx: 12
  },
  size: {
    widthPx: 360,
    heightPx: 220
  },
  antiAutomation: {
    minSolveTimeMs: 700,
    requirePointerTravelPx: 80
  },
  security: {
    shadowRootMode: 'closed' as const
  },
  timeoutMs: 0
}

const normalizeChallenge = (
  challenge?: HumanCaptchaChallengeOption
): HumanCaptchaChallengeOption => {
  if (!challenge) return { type: 'click-button' }
  if (!('type' in challenge) || !challenge.type) return { type: 'click-button' }
  return challenge
}

export const createHumanCaptcha = (options: HumanCaptchaOptions = {}): HumanCaptchaInstance => {
  let destroyed = false
  let verifyingPromise: Promise<boolean> | null = null

  let hostEl: HTMLDivElement | null = null

  let resolveVerify: ((value: boolean) => void) | null = null
  let settled = false

  let cleanupFns: CleanupFn[] = []
  let challengeHandle: HumanCaptchaChallengeHandle | null = null

  let openedAtMs = 0
  let pointerTravelPx = 0
  let lastPointer: { x: number; y: number } | null = null

  const merged = {
    text: { ...defaults.text, ...(options.text ?? {}) },
    position: { ...defaults.position, ...(options.position ?? {}) },
    size: { ...defaults.size, ...(options.size ?? {}) },
    antiAutomation: { ...defaults.antiAutomation, ...(options.antiAutomation ?? {}) },
    canvas: options.canvas ?? {},
    challenge: normalizeChallenge(options.challenge),
    security: { ...defaults.security, ...(options.security ?? {}) },
    timeoutMs: options.timeoutMs ?? defaults.timeoutMs
  }

  const safeResolve = (value: boolean): void => {
    if (settled) return
    settled = true
    resolveVerify?.(value)
  }

  const destroy = (): void => {
    if (destroyed) return
    destroyed = true

    try {
      challengeHandle?.destroy?.()
    } catch {
      // ignore
    }

    cleanupFns.forEach((fn) => {
      try {
        fn()
      } catch {
        // ignore
      }
    })
    cleanupFns = []

    if (hostEl?.parentNode) {
      hostEl.parentNode.removeChild(hostEl)
    }

    hostEl = null
    challengeHandle = null
  }

  const mount = (): {
    dialogEl: HTMLDivElement
    titleCanvas: HTMLCanvasElement
    messageCanvas: HTMLCanvasElement
    challengeMount: HTMLDivElement
    buttonEl: HTMLButtonElement
    buttonCanvas: HTMLCanvasElement
  } => {
    const token = createToken()

    const host = document.createElement('div')
    host.setAttribute(`data-${token}`, '')
    document.body.appendChild(host)

    const shadow = host.attachShadow({ mode: merged.security.shadowRootMode ?? 'closed' })

    const wrapper = document.createElement('div')
    wrapper.style.cssText =
      'position:fixed;inset:0;z-index:2147483647;display:block;contain:layout style;'

    const overlay = document.createElement('div')
    overlay.style.cssText =
      'position:absolute;inset:0;background-color:var(--tml-text-color-primary);opacity:0.35;'

    const dialog = document.createElement('div')
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-modal', 'true')
    dialog.style.cssText = [
      'position:fixed',
      `width:${merged.size.widthPx}px`,
      `height:${merged.size.heightPx}px`,
      'background-color:var(--tml-bg-color-overlay)',
      'border:1px solid var(--tml-border-color-light)',
      'border-radius:var(--tml-border-radius-base)',
      'box-shadow:var(--tml-box-shadow-light)',
      'padding:16px',
      'display:flex',
      'flex-direction:column',
      'gap:12px',
      'user-select:none'
    ].join(';')

    const titleCanvas = document.createElement('canvas')
    titleCanvas.setAttribute('aria-hidden', 'true')

    const messageCanvas = document.createElement('canvas')
    messageCanvas.setAttribute('aria-hidden', 'true')

    const challengeMount = document.createElement('div')
    challengeMount.style.cssText = 'margin-top:auto;display:flex;justify-content:center;'

    const button = document.createElement('button')
    button.type = 'button'
    button.setAttribute('aria-label', merged.text.buttonLabel)
    button.style.cssText = [
      'width:240px',
      'height:44px',
      'border-radius:var(--tml-border-radius-base)',
      'border:1px solid var(--tml-border-color)',
      'background-color:var(--tml-color-primary)',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'padding:0'
    ].join(';')

    const buttonCanvas = document.createElement('canvas')
    buttonCanvas.setAttribute('aria-hidden', 'true')

    button.appendChild(buttonCanvas)
    challengeMount.appendChild(button)

    dialog.appendChild(titleCanvas)
    dialog.appendChild(messageCanvas)
    dialog.appendChild(challengeMount)

    wrapper.appendChild(overlay)
    wrapper.appendChild(dialog)

    const style = document.createElement('style')
    style.textContent = [
      '*{box-sizing:border-box;}',
      'button{font:inherit;}',
      'canvas{display:block;}'
    ].join('')

    shadow.appendChild(style)
    shadow.appendChild(wrapper)

    hostEl = host

    // Cancel via overlay click
    const onOverlayClick = (): void => {
      safeResolve(false)
      destroy()
    }
    overlay.addEventListener('click', onOverlayClick)
    cleanupFns.push(() => overlay.removeEventListener('click', onOverlayClick))

    // Cancel via Escape
    const onKeyDown = (ev: KeyboardEvent): void => {
      if (ev.key === 'Escape') {
        ev.preventDefault()
        safeResolve(false)
        destroy()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    cleanupFns.push(() => window.removeEventListener('keydown', onKeyDown))

    // Pointer travel tracking
    const onMove = (ev: MouseEvent): void => {
      const { clientX, clientY } = ev
      if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return
      if (!lastPointer) {
        lastPointer = { x: clientX, y: clientY }
        return
      }
      const dx = clientX - lastPointer.x
      const dy = clientY - lastPointer.y
      pointerTravelPx += Math.sqrt(dx * dx + dy * dy)
      lastPointer = { x: clientX, y: clientY }
    }
    window.addEventListener('mousemove', onMove)
    cleanupFns.push(() => window.removeEventListener('mousemove', onMove))

    // Timeout
    if ((merged.timeoutMs ?? 0) > 0) {
      const timer = window.setTimeout(() => {
        safeResolve(false)
        destroy()
      }, merged.timeoutMs)
      cleanupFns.push(() => window.clearTimeout(timer))
    }

    // Resize clamp
    const onResize = (): void => {
      clampDialogToViewport(dialog)
    }
    window.addEventListener('resize', onResize)
    cleanupFns.push(() => window.removeEventListener('resize', onResize))

    return {
      dialogEl: dialog,
      titleCanvas,
      messageCanvas,
      challengeMount,
      buttonEl: button,
      buttonCanvas
    }
  }

  const positionDialog = (dialog: HTMLElement): void => {
    const { widthPx, heightPx } = merged.size
    const { centerJitterPx, clampMarginPx } = merged.position

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    const jitter = Math.max(0, centerJitterPx ?? 0)
    const dx = randomBetween(-jitter, jitter)
    const dy = randomBetween(-jitter, jitter)

    const desiredLeft = centerX - widthPx / 2 + dx
    const desiredTop = centerY - heightPx / 2 + dy

    const margin = Math.max(0, clampMarginPx ?? 0)
    const left = clamp(desiredLeft, margin, Math.max(margin, window.innerWidth - widthPx - margin))
    const top = clamp(desiredTop, margin, Math.max(margin, window.innerHeight - heightPx - margin))

    dialog.style.left = `${left}px`
    dialog.style.top = `${top}px`
  }

  const clampDialogToViewport = (dialog: HTMLElement): void => {
    const { widthPx, heightPx } = merged.size
    const margin = Math.max(0, merged.position.clampMarginPx ?? 0)

    const currentLeft = Number.parseFloat(dialog.style.left || '0')
    const currentTop = Number.parseFloat(dialog.style.top || '0')

    const left = clamp(currentLeft, margin, Math.max(margin, window.innerWidth - widthPx - margin))
    const top = clamp(currentTop, margin, Math.max(margin, window.innerHeight - heightPx - margin))

    dialog.style.left = `${left}px`
    dialog.style.top = `${top}px`
  }

  const setupChallenge = (mountPoint: HTMLElement, buttonEl: HTMLButtonElement): void => {
    const ctx: HumanCaptchaChallengeContext = {
      mountPoint,
      cancel: () => {
        safeResolve(false)
        destroy()
      },
      requestSolve: () => {
        const minSolveTimeMs = merged.antiAutomation.minSolveTimeMs ?? 0
        const requirePointerTravelPx = merged.antiAutomation.requirePointerTravelPx ?? 0

        const elapsed = Date.now() - openedAtMs
        if (minSolveTimeMs > 0 && elapsed < minSolveTimeMs) return
        if (requirePointerTravelPx > 0 && pointerTravelPx < requirePointerTravelPx) return

        safeResolve(true)
        destroy()
      },
      getSignals: () => ({ openedAtMs, pointerTravelPx })
    }

    if (merged.challenge.type === 'custom') {
      const handle = merged.challenge.factory(ctx)
      challengeHandle = handle ?? null
      return
    }

    challengeHandle = mountClickButtonChallenge(ctx, { buttonEl })
  }

  const drawCanvases = (params: {
    titleCanvas: HTMLCanvasElement
    messageCanvas: HTMLCanvasElement
    buttonCanvas: HTMLCanvasElement
    hostForVars: Element
  }): void => {
    const { titleCanvas, messageCanvas, buttonCanvas, hostForVars } = params

    const width = merged.size.widthPx - 32

    renderTextCanvas({
      canvas: titleCanvas,
      text: merged.text.title,
      maxWidthPx: width,
      heightPx: 28,
      hostForVars,
      style: merged.canvas.titleStyle,
      defaultVarColor: '--tml-text-color-primary',
      defaultVarFontSize: '--tml-font-size-large'
    })

    renderTextCanvas({
      canvas: messageCanvas,
      text: merged.text.message,
      maxWidthPx: width,
      heightPx: 44,
      hostForVars,
      style: merged.canvas.messageStyle,
      defaultVarColor: '--tml-text-color-regular',
      defaultVarFontSize: '--tml-font-size-base'
    })

    renderTextCanvas({
      canvas: buttonCanvas,
      text: merged.text.buttonLabel,
      maxWidthPx: 220,
      heightPx: 20,
      hostForVars,
      style: merged.canvas.buttonStyle,
      defaultVarColor: '--tml-bg-color',
      defaultVarFontSize: '--tml-font-size-base'
    })
  }

  const verify = (): Promise<boolean> => {
    if (destroyed) return Promise.resolve(false)
    if (verifyingPromise) return verifyingPromise

    openedAtMs = Date.now()
    pointerTravelPx = 0
    lastPointer = null

    verifyingPromise = new Promise<boolean>((resolve) => {
      resolveVerify = resolve
    })

    const { dialogEl, titleCanvas, messageCanvas, challengeMount, buttonEl, buttonCanvas } = mount()

    drawCanvases({ titleCanvas, messageCanvas, buttonCanvas, hostForVars: hostEl! })
    positionDialog(dialogEl)

    setupChallenge(challengeMount, buttonEl)

    return verifyingPromise
  }

  return {
    verify,
    destroy: () => {
      safeResolve(false)
      destroy()
    }
  }
}
