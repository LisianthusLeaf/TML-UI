export type HumanCaptchaBooleanResult = boolean

export interface HumanCaptchaTextOptions {
  title?: string
  message?: string
  buttonLabel?: string
}

export interface HumanCaptchaPositionOptions {
  /** Random jitter around viewport center, in px */
  centerJitterPx?: number
  /** Clamp margin from viewport edges, in px */
  clampMarginPx?: number
}

export interface HumanCaptchaAntiAutomationOptions {
  /** If > 0, attempts before this time are ignored. */
  minSolveTimeMs?: number
  /** If > 0, requires pointer travel distance before solve can succeed. */
  requirePointerTravelPx?: number
}

export interface HumanCaptchaSizeOptions {
  widthPx?: number
  heightPx?: number
}

export interface HumanCaptchaCanvasTextStyle {
  fontSizePx?: number
  fontWeight?: number | string
  colorCss?: string
}

export interface HumanCaptchaCanvasOptions {
  titleStyle?: HumanCaptchaCanvasTextStyle
  messageStyle?: HumanCaptchaCanvasTextStyle
  buttonStyle?: HumanCaptchaCanvasTextStyle
}

export interface HumanCaptchaChallengeSignals {
  openedAtMs: number
  pointerTravelPx: number
}

export interface HumanCaptchaChallengeContext {
  mountPoint: HTMLElement
  requestSolve: () => void
  cancel: () => void
  getSignals: () => HumanCaptchaChallengeSignals
}

export interface HumanCaptchaChallengeHandle {
  destroy?: () => void
}

export type HumanCaptchaChallengeFactory = (
  ctx: HumanCaptchaChallengeContext
) => HumanCaptchaChallengeHandle | void

export type HumanCaptchaChallengeOption =
  | {
      type?: 'click-button'
    }
  | {
      type: 'custom'
      factory: HumanCaptchaChallengeFactory
    }

export interface HumanCaptchaSecurityOptions {
  /** Default: 'closed'. Use 'open' for tests/debug only. */
  shadowRootMode?: 'closed' | 'open'
}

export interface HumanCaptchaOptions {
  text?: HumanCaptchaTextOptions
  position?: HumanCaptchaPositionOptions
  size?: HumanCaptchaSizeOptions
  canvas?: HumanCaptchaCanvasOptions
  antiAutomation?: HumanCaptchaAntiAutomationOptions
  challenge?: HumanCaptchaChallengeOption
  security?: HumanCaptchaSecurityOptions
  /** If > 0, auto-cancel after timeout. */
  timeoutMs?: number
  /**
   * Whether the modal can be closed by user interaction (Escape key, overlay click, close button).
   * When false, only `destroy()` can close the modal programmatically.
   * @default true
   */
  closable?: boolean
}

export interface HumanCaptchaInstance {
  verify: () => Promise<HumanCaptchaBooleanResult>
  destroy: () => void
}
