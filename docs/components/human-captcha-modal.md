# Human Captcha 人机校验弹窗

纯前端（无后端校验、无第三方验证码服务）的“尽力而为”人机校验弹窗能力，用于提高明显自动化脚本的操作成本。

- 以程序化 API 触发：`createHumanCaptcha().verify()` 返回 `Promise<boolean>`
- 默认挑战：点击按钮（click-button）
- 文字默认通过 `canvas` 绘制（不以 DOM 文本节点形式呈现）
- UI 默认渲染在 `closed ShadowRoot` 内（best-effort），避免稳定选择器

## 基础用法

```ts
import { createHumanCaptcha } from 'tml-ui'

const captcha = createHumanCaptcha({
  text: {
    title: '安全校验',
    message: '请点击下方按钮完成验证',
    buttonLabel: '我不是机器人'
  }
})

const ok = await captcha.verify()
if (ok) {
  // 通过
} else {
  // 取消 / 关闭 / 超时
}
```

## Vue 示例（按钮触发 + 结果回显）

```vue
<template>
  <div>
    <tml-button type="primary" :loading="verifying" @click="verify">
      触发人机校验
    </tml-button>
    <p v-if="result !== null">结果：{{ result ? '通过' : '取消/关闭/超时' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createHumanCaptcha } from 'tml-ui'

const verifying = ref(false)
const result = ref<boolean | null>(null)

const verify = async () => {
  if (verifying.value) return
  verifying.value = true
  result.value = null

  const captcha = createHumanCaptcha({ timeoutMs: 10000 })
  result.value = await captcha.verify()
  verifying.value = false
}
</script>
```

## 配置项

### HumanCaptchaOptions

| 字段           | 说明                   | 类型                                | 默认值                                                |
| -------------- | ---------------------- | ----------------------------------- | ----------------------------------------------------- |
| text           | 标题/说明/按钮文案     | `HumanCaptchaTextOptions`           | 内置中文默认文案                                      |
| position       | 随机定位与 clamp       | `HumanCaptchaPositionOptions`       | `{ centerJitterPx: 120, clampMarginPx: 12 }`          |
| size           | 弹窗尺寸               | `HumanCaptchaSizeOptions`           | `{ widthPx: 360, heightPx: 220 }`                     |
| antiAutomation | 反自动化信号（可关闭） | `HumanCaptchaAntiAutomationOptions` | `{ minSolveTimeMs: 700, requirePointerTravelPx: 80 }` |
| challenge      | 挑战类型（可插拔）     | `HumanCaptchaChallengeOption`       | `click-button`                                        |
| timeoutMs      | 超时自动取消           | `number`                            | `0`（不超时）                                         |

### antiAutomation

| 字段                   | 说明             | 类型     | 备注            |
| ---------------------- | ---------------- | -------- | --------------- |
| minSolveTimeMs         | 最短交互时间门槛 | `number` | 设置为 `0` 关闭 |
| requirePointerTravelPx | 指针移动距离阈值 | `number` | 设置为 `0` 关闭 |

## 自定义挑战（challenge 注入）

你可以注入自定义挑战逻辑来替换默认的 click-button：

```ts
import { createHumanCaptcha } from 'tml-ui'

const captcha = createHumanCaptcha({
  antiAutomation: { minSolveTimeMs: 0, requirePointerTravelPx: 0 },
  challenge: {
    type: 'custom',
    factory: (ctx) => {
      // 你的 UI 可以挂载到 ctx.mountPoint
      // 完成挑战后调用 ctx.requestSolve()
      // 取消则调用 ctx.cancel()
      ctx.requestSolve()

      return {
        destroy() {
          // 清理事件/DOM
        }
      }
    }
  }
})

const ok = await captcha.verify()
```

## 局限性说明

- 纯前端场景无“后端信任根”，不承诺绝对防机器人；目标是提高自动化脚本成本。
- 反自动化信号为 best-effort，可能受浏览器/自动化环境差异影响；如需可访问性优先，可将门槛配置为 `0`。
