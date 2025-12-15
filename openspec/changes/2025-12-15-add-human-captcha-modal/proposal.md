# Change: Add pure-frontend human captcha modal

## Why
在纯前端场景下（无后端校验、无第三方验证码服务）仍然需要对“明显自动化脚本”的批量操作做一定的拦截。目前组件库缺少一个可复用、可配置、可扩展的“人机校验弹窗”能力。

## What Changes
- 新增一个纯前端的人机验证码弹窗能力（以程序化 API 触发，返回 Promise 校验结果）。
- 默认提供“点击按钮”的校验挑战（click-button challenge），并设计为可插拔挑战，便于后续扩展更多挑战类型。
- 弹窗采用随机偏移定位（尽量靠近屏幕中间），并在视口内自动夹取。
- 为降低被脚本通过选择器轻易命中的概率：
  - 弹窗渲染在 **closed ShadowRoot** 内（外部脚本难以直接 query 到内部结构）。
  - 不使用稳定的 `id`，不使用稳定的自定义 `class`（仅允许 Tailwind 工具类；并允许对宿主节点追加随机 attribute）。
- 弹窗展示文字不直接以 DOM 文本节点形式放在元素内：默认通过 `canvas` 绘制文本（按钮本体可为无文本的可点击区域，语义通过 aria 属性提供）。
- 增加若干“尽力而为”的自动化拦截信号（均可配置开关，避免影响可访问性）：
  - 最短交互时间门槛（弹窗出现后过快点击视为无效）。
  - 指针轨迹/移动距离阈值（需要一定自然移动）。

## Impact
- Affected specs: `human-captcha-modal`（新增 capability）
- Affected code (planned): `src/*`（新增可复用的弹窗与挑战实现，并在 `src/index.ts` 导出）
- Affected docs (planned): `docs/*`（新增能力文档页与示例）
- Affected tests (planned): `tests/*`（新增单测覆盖核心行为与可配置项）

## Non-Goals
- 不宣称“绝对防机器人”。纯前端无后端信任根，目标是提高自动化成本与误用门槛。
- 不做账号风控、设备指纹、跨会话持久化判定等复杂风控能力。
- 不引入第三方验证码服务或外部网络请求。

## API Sketch (Proposal)
以程序化 API 使用（伪代码）：

```ts
import { createHumanCaptcha } from 'tml-ui'

const captcha = createHumanCaptcha({
  // 文案不以 DOM 文本出现：内部用 canvas 渲染
  text: {
    title: '安全校验',
    message: '请点击下方按钮完成验证',
    buttonLabel: '我不是机器人'
  },
  position: {
    // 以视口中心为基准随机偏移
    centerJitterPx: 120
  },
  antiAutomation: {
    minSolveTimeMs: 700,
    requirePointerTravelPx: 80
  },
  challenge: {
    type: 'click-button'
  }
})

const ok = await captcha.verify()
```

## Notes
- “不使用 id/class”的要求在实践中更稳妥的实现方式是：将 UI 渲染在 closed ShadowRoot 内，并避免稳定选择器；同时仍保持基本可访问性（role/aria）。
- “文字不在元素内”的要求以 canvas 绘制最直接；aria 文案仍可作为属性存在（可配置是否启用）。
- 随机定位会进行视口边界夹取，避免弹窗出屏。
