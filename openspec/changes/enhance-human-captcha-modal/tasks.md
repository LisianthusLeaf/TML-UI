# Tasks: 优化人机校验弹窗

## 1. Implementation

- [x] **1.1** 在 `types.ts` 中添加 `closable` 配置项类型定义
- [x] **1.2** 在 `createHumanCaptcha.ts` 中添加 `closable` 默认值并合并配置
- [x] **1.3** 修改 Escape 键和遮罩层点击逻辑，根据 `closable` 决定是否响应
- [x] **1.4** 添加关闭按钮（×）到弹窗右上角，受 `closable` 控制显示/隐藏
- [x] **1.5** 优化弹窗样式：调整内边距、间距、圆角
- [x] **1.6** 优化验证按钮样式：添加 hover/active 状态
- [x] **1.7** 优化标题和消息的垂直居中对齐

## 2. Documentation

- [x] **2.1** 更新 `docs/components/human-captcha-modal.md`，添加 `closable` 配置说明
- [x] **2.2** 更新配置项表格，说明样式优化的变化

## 3. Testing

- [x] **3.1** 添加 `closable: true` 场景测试（默认行为，Escape/遮罩层可关闭）
- [x] **3.2** 添加 `closable: false` 场景测试（Escape/遮罩层不可关闭）
- [x] **3.3** 添加 `closable: false` + `destroy()` 测试（API 层仍可销毁）
- [x] **3.4** 添加关闭按钮点击测试

## 4. Validation

- [x] **4.1** 运行 `npm run test` 确保所有测试通过
- [x] **4.2** 运行 `npm run lint` 确保代码风格一致
- [x] **4.3** 本地验证弹窗样式和交互效果

## Dependencies

- 1.1 → 1.2 → 1.3, 1.4
- 1.5, 1.6, 1.7 可与 1.3, 1.4 并行
- 2.x 在 1.x 完成后进行
- 3.x 可与 1.x 并行或之后进行
- 4.x 在所有实现完成后进行
