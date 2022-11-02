import type { Ref } from "vue"
import { unref, watch } from "vue"
import { tryOnScopeDispose } from "../tryOnScopeDispose"

const noop = () => {}

export const useEventListener = (
  target: Ref<HTMLElement> | HTMLElement | null,
  event: string,
  listener: VoidFunction
) => {
  let cleanup = noop
  const stopWatch = watch(
    target as Ref<HTMLElement>,
    (_el) => {
      const el = unref(_el)
      cleanup()
      if (!el) return
      el.addEventListener(event, listener)
      cleanup = () => {
        el.removeEventListener(event, listener)
        cleanup = noop
      }
    },
    { immediate: true, flush: "post" }
  )
  const stop = () => {
    stopWatch()
    cleanup()
  }
  tryOnScopeDispose(stop)
  return stop
}
