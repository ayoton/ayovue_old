import { getCurrentScope, onScopeDispose } from "vue"

export const tryOnScopeDispose = (fn: VoidFunction) => {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
