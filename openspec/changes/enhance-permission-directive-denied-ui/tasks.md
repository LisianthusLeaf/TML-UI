## 1. Proposal Validation
- [x] 1.1 Run `openspec validate enhance-permission-directive-denied-ui --strict` and fix all issues

## 2. Types & API
- [x] 2.1 Extend `PermissionBehavior` to support disable tooltip configuration
- [x] 2.2 Extend `PermissionBehavior` to support replace "show original + strike" configuration
- [x] 2.3 Ensure backward compatibility for existing `replaceText` usage

## 3. Directive Implementation
- [x] 3.1 Implement tooltip lifecycle for `mode: 'disable'` (bind/unbind, create/remove DOM)
- [x] 3.2 Implement replace rendering for "show original + strike" option
- [x] 3.3 Ensure `restoreAll()` fully restores tooltip/replace states on updates/unmount

## 4. Tests
- [x] 4.1 Add unit tests for disable tooltip creation and cleanup
- [x] 4.2 Add unit tests for replace showOriginal/strikeOriginal rendering and restore

## 5. Docs
- [x] 5.1 Update `docs/directives/permission.md` with new options and examples
- [x] 5.2 Document limitations (replace targets should be text-only)
