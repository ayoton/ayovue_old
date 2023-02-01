import type { MaybeElementRef } from "@vueuse/core"
import type { Options } from "./getPosition"
import { reactive, watch, ref, unref } from "vue"
import { unrefElement, useElementBounding, useWindowSize, MaybeRef } from "@vueuse/core"
import { getPosition } from "./getPosition"

interface PopperOptions extends Options {
  updateOnScroll?: boolean
  updateOnResize?: boolean
}

export const usePopper = (
  target: MaybeElementRef,
  element: MaybeElementRef,
  options: PopperOptions = {}
) => {
  const style = ref({})
  const isOpen = ref(false)
  const autoOptions = reactive({
    targetRadius: 0,
    radius: 0,
    borderColor: "transparent",
    backgroundColor: "transparent",
  })
  const { strategy = "fixed" } = options
  const { updateOnScroll = false, updateOnResize = false } = options
  const updateRule = {
    windowResize: updateOnResize || strategy === "fixed",
    windowScroll: updateOnScroll || strategy === "fixed",
  }
  const targetRect = reactive(useElementBounding(target, updateRule))
  const floatingSize = reactive(useElementBounding(element, updateRule))
  const screenSize = reactive(useWindowSize({}))

  watch(
    [target, element, targetRect, floatingSize, screenSize],
    () => {
      const $target = unrefElement(target)
      const $element = unrefElement(element)
      if ($target && $element) {
        if (!isOpen.value) {
          targetRect.update()
          floatingSize.update()
          isOpen.value = true
        }
        const targetRadius = Number(
          window.getComputedStyle($target).borderRadius.replace("px", "") || "0"
        )
        const computedStyles = window.getComputedStyle($element)
        const radius = Number(computedStyles.borderRadius.replace("px", "") || "0")
        const borderColor = computedStyles.borderColor
        const backgroundColor = computedStyles.backgroundColor
        const borderWidth = Number(computedStyles.borderWidth.replace("px", "") || "0")
        const _options = {
          ...autoOptions,
          targetRadius: isNaN(targetRadius) ? 0 : targetRadius,
          radius: isNaN(radius) ? 0 : radius,
          backgroundColor,
          borderWidth: isNaN(borderWidth) ? 0 : borderWidth,
          borderColor,
          ...options,
        }
        style.value = getPosition(targetRect, floatingSize, screenSize, _options)
      } else {
        isOpen.value = false
      }
    },
    {
      immediate: true,
      flush: "post",
    }
  )
  return style
}
