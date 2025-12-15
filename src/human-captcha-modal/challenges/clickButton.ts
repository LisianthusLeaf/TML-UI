import type { HumanCaptchaChallengeContext, HumanCaptchaChallengeHandle } from '../types'

export const mountClickButtonChallenge = (
  ctx: HumanCaptchaChallengeContext,
  params: {
    buttonEl: HTMLButtonElement
  }
): HumanCaptchaChallengeHandle => {
  const onClick = (ev: MouseEvent): void => {
    ev.preventDefault()
    ctx.requestSolve()
  }

  params.buttonEl.addEventListener('click', onClick)

  return {
    destroy() {
      params.buttonEl.removeEventListener('click', onClick)
    }
  }
}
