# Change: 优化人机校验弹窗样式与添加不可关闭配置

## Why

当前人机校验弹窗的样式较为简单，缺乏视觉层次感和现代化的交互体验。同时，某些场景下需要强制用户完成验证后才能关闭弹窗（例如敏感操作确认），当前实现允许用户通过 Escape 键、点击遮罩层或调用 `destroy()` 来取消验证，无法满足此需求。

## What Changes

1. **样式优化**
   - 弹窗添加更好的视觉层次：优化标题/消息/按钮的间距和对齐方式
   - 按钮添加 hover/active 状态反馈
   - 优化整体圆角、阴影和内边距
   - 添加关闭按钮（当 `closable: true` 时显示）

2. **添加 `closable` 配置项** (**BREAKING 行为变更**)
   - 新增 `closable?: boolean` 配置，默认为 `true`（保持向后兼容）
   - 当 `closable: false` 时：
     - 禁用 Escape 键关闭
     - 禁用点击遮罩层关闭
     - 不显示关闭按钮
     - `destroy()` 方法仍然可用（API 层面的逃生舱）

## Impact

- Affected specs: `human-captcha-modal`
- Affected code:
  - `src/human-captcha-modal/createHumanCaptcha.ts` - 添加 closable 逻辑、优化样式
  - `src/human-captcha-modal/types.ts` - 添加 closable 类型定义
  - `docs/components/human-captcha-modal.md` - 更新文档
  - `tests/human-captcha-modal.spec.ts` - 添加新测试用例
