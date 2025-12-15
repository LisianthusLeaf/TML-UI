## 1. 提案确认

- [x] 确认能力命名与导出方式（建议：`createHumanCaptcha`）
- [x] 确认默认挑战类型：click-button
- [x] 确认“文字不在 DOM 文本节点中”的实现路径（默认 canvas）
- [x] 确认随机定位策略与边界夹取规则
- [x] 确认 anti-automation 信号默认值与可关闭策略（可访问性优先）

## 2. 设计与类型

- [x] 设计挑战插件接口（可扩展）与默认 challenge 的类型定义
- [x] 定义可配置项（文案、尺寸、定位、关闭行为、anti-automation、挑战类型）
- [x] 明确返回值形态（Promise<boolean> 或 richer result）

## 3. 实现

- [x] 实现程序化挂载/卸载（document.body + closed ShadowRoot）
- [x] 实现遮罩与弹窗容器（不使用稳定 id，自定义 class 仅 Tailwind）
- [x] 实现 canvas 文本渲染与定位（将可见文案从 DOM 文本节点移除）
- [x] 实现随机定位与窗口 resize 适配
- [x] 实现 click-button challenge（无按钮文本，点击区域 + canvas 文案覆盖）
- [x] 实现 anti-automation 校验（最短时间、指针移动距离等，可配置开关）
- [x] 导出到 `src/index.ts`

## 4. 测试

- [x] 单测：调用 verify() 会创建弹窗并返回 Promise
- [x] 单测：通过挑战后 resolve 为 true，取消/关闭为 false
- [x] 单测：随机定位在视口内（clamp 生效）
- [x] 单测：DOM 中无可见文案的 text node（canvas 模式）
- [x] 单测：anti-automation 最短时间门槛生效
- [x] 单测：challenge 可替换（注入自定义挑战实现）

## 5. 文档

- [x] 新增文档页：用法、配置项、扩展 challenge 示例
- [x] 说明局限性：纯前端仅提升成本，非强安全

## 6. OpenSpec 验证

- [x] 运行 `openspec validate 2025-12-15-add-human-captcha-modal --strict`
- [x] 修复所有验证错误和警告
