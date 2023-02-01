import type { CSSProperties, StyleValue } from "vue"
import type { MaybeRef } from "@vueuse/core"

export interface CustomCSSProperties extends CSSProperties {
  [key: `--${string}`]: string | number
}

export interface ElementSize {
  height: number
  width: number
}

export interface Options {
  placement?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "right-top"
    | "right-bottom"
    | "left-top"
    | "left-bottom"
  fallbackPlacement?: "top" | "right" | "bottom" | "left"
  arrowSize?: number
  borderColor?: string
  borderWidth?: number
  backgroundColor?: string
  targetRadius?: number
  radius?: number
  followParentWidth?: boolean
  direction?: "in" | "out"
  strategy?: "absolute" | "fixed"
}

export interface TargetRect {
  height: number
  bottom: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}

export const getPosition = (
  targetRect: TargetRect,
  floatingSize: ElementSize,
  screenSize: ElementSize,
  options: Options = {}
) => {
  const {
    placement = "bottom",
    arrowSize = 0,
    borderColor = "gray",
    backgroundColor = "white",
    borderWidth = 0,
    radius = 0,
    targetRadius = 0,
    followParentWidth = false,
    direction = "out",
    strategy = "fixed",
  } = options
  if (followParentWidth) {
    floatingSize.width = targetRect.width
  }
  const outerArrowSize = arrowSize ? arrowSize + borderWidth : 0
  const innerArrowSize = arrowSize ? outerArrowSize - Math.SQRT2 * borderWidth : 0
  const arrowDiff = Math.max(outerArrowSize - innerArrowSize, 0)
  let [primary, secondary = "center"] = placement.split("-")
  const primarySpacing = arrowSize
  const innerSpacing =
    -Math.abs(outerArrowSize) +
    Math.max(targetRadius - arrowSize, Math.max(radius, borderWidth))
  const secondarySpacing = Math.max(borderWidth, radius) + targetRadius + arrowSize
  const availAbleSpace = {
    top: targetRect.top,
    right: screenSize.width - targetRect.right,
    bottom: screenSize.height - targetRect.bottom,
    left: targetRect.left,
  }
  const style: any = {}
  // setting primary position
  const axis = ["top", "bottom"].includes(primary) ? "x" : "y"
  const sAxis =
    secondary === "center" ? "c" : ["top", "bottom"].includes(secondary) ? "x" : "y"
  const xHeight = floatingSize.height + arrowSize
  const xWidth = floatingSize.width + arrowSize
  switch (axis) {
    case "x":
      if (
        (primary === "top" &&
          (availAbleSpace.top - xHeight >= 0 ||
            availAbleSpace.bottom < availAbleSpace.top)) ||
        (primary === "bottom" &&
          availAbleSpace.bottom < xHeight &&
          availAbleSpace.bottom < availAbleSpace.top)
      ) {
        // floating element placed at top
        style.top = targetRect.top - xHeight
        style.fabt = floatingSize.height - 2 * borderWidth
        style.faat = style.fabt + 0.15
        style.fabbw = `${outerArrowSize}px ${outerArrowSize}px 0 ${outerArrowSize}px`
        style.faabw = `${innerArrowSize}px ${innerArrowSize}px 0 ${innerArrowSize}px`
        style.fabbc = `${borderColor} transparent transparent transparent`
        style.faabc = `${backgroundColor} transparent transparent transparent`
      } else {
        // floating element placed at bottom
        style.top = targetRect.bottom + arrowSize
        style.fabt = -1 * outerArrowSize
        style.faat = style.fabt + arrowDiff + 0.15
        style.fabbw = `0 ${outerArrowSize}px ${outerArrowSize}px ${outerArrowSize}px`
        style.faabw = `0 ${innerArrowSize}px ${innerArrowSize}px ${innerArrowSize}px`
        style.fabbc = `transparent transparent ${borderColor} transparent`
        style.faabc = `transparent transparent ${backgroundColor} transparent`
      }
      break
    default:
      if (
        (primary === "left" &&
          (availAbleSpace.left >= xWidth ||
            availAbleSpace.right < availAbleSpace.left)) ||
        (primary === "right" &&
          availAbleSpace.right < xWidth &&
          availAbleSpace.right < availAbleSpace.left)
      ) {
        // floating element placed at left
        style.left = targetRect.left - xWidth
        style.fabl = floatingSize.width - 2 * borderWidth
        style.faal = style.fabl
        style.fabbw = `${outerArrowSize}px 0 ${outerArrowSize}px ${outerArrowSize}px`
        style.faabw = `${innerArrowSize}px 0 ${innerArrowSize}px ${innerArrowSize}px`
        style.fabbc = `transparent transparent transparent ${borderColor}`
        style.faabc = `transparent transparent transparent ${backgroundColor}`
      } else {
        // floating element placed at right
        style.left = targetRect.right + arrowSize
        style.fabl = -1 * outerArrowSize
        style.faal = style.fabl + arrowDiff + 0.15
        style.fabbw = `${outerArrowSize}px ${outerArrowSize}px ${outerArrowSize}px 0`
        style.faabw = `${innerArrowSize}px ${innerArrowSize}px ${innerArrowSize}px 0`
        style.fabbc = `transparent ${borderColor} transparent transparent`
        style.faabc = `transparent ${backgroundColor} transparent transparent`
      }
      break
  }

  // working with secondary placement
  switch (secondary) {
    case "top":
      const topOut = targetRect.top - floatingSize.height + secondarySpacing
      if (direction === "out" && topOut >= 0) {
        style.top = topOut
        style.fabt =
          floatingSize.height - Math.max(borderWidth, radius) - outerArrowSize * 2
        style.faat = style.fabt + arrowDiff
      } else {
        style.top = targetRect.top
        style.fabt =
          -borderWidth +
          Math.max(Math.max(radius - borderWidth, 0), targetRadius - outerArrowSize)
        style.faat = style.fabt + arrowDiff
      }
      break
    case "bottom":
      const bottomOut = targetRect.bottom - secondarySpacing
      if (direction === "out" && bottomOut + floatingSize.height <= screenSize.height) {
        style.top = bottomOut
        style.fabt = -Math.abs(borderWidth) + Math.max(radius - borderWidth, 0)
        style.faat = style.fabt + arrowDiff
      } else {
        style.top = targetRect.bottom - floatingSize.height
        style.fabt =
          floatingSize.height -
          borderWidth -
          Math.max(
            targetRadius + outerArrowSize,
            Math.max(radius - borderWidth, 0) + outerArrowSize * 2
          )
        style.faat = style.fabt + arrowDiff
      }
      break
    case "left":
      const leftOut = targetRect.left + secondarySpacing - floatingSize.width
      if (direction === "out" && leftOut >= 0) {
        style.left = leftOut
        style.fabl =
          floatingSize.width - Math.max(radius, borderWidth) - 2 * outerArrowSize
        style.faal = style.fabl + arrowDiff + 0.15
      } else {
        style.left = targetRect.left
        style.fabl =
          0 -
          borderWidth +
          Math.max(Math.max(radius - borderWidth, 0), targetRadius - outerArrowSize)
        style.faal = style.fabl + arrowDiff + 0.15
      }
      break
    case "right":
      const rightOut = targetRect.right - secondarySpacing
      if (direction === "out" && rightOut + floatingSize.width <= screenSize.width) {
        style.left = rightOut
        style.fabl = -borderWidth + Math.max(radius - borderWidth, 0)
        style.faal = style.fabl + arrowDiff + 0.15
      } else {
        style.left = targetRect.right - floatingSize.width
        style.fabl =
          floatingSize.width -
          borderWidth -
          Math.max(
            targetRadius + outerArrowSize,
            Math.max(radius - borderWidth, 0) + outerArrowSize * 2
          )
        style.faal = style.fabl + arrowDiff + 0.15
      }
      break
    default:
      if (axis === "x") {
        style.left = targetRect.left + (targetRect.width - floatingSize.width) / 2
        style.fabl = (floatingSize.width - 2 * borderWidth) / 2 - outerArrowSize
        style.faal = style.fabl + arrowDiff
      } else {
        style.top = targetRect.top + (targetRect.width - floatingSize.height) / 2
        style.fabt = (floatingSize.height - 2 * borderWidth) / 2 - outerArrowSize
        style.faat = style.fabt + arrowDiff
      }
      break
  }
  if (strategy === "absolute") {
    style.top = style.top + scrollY
    style.left = style.left + scrollX
  }
  const $style: any = {
    position: strategy,
    top: style.top + "px",
    left: style.left + "px",
    "--fabt": style.fabt + "px",
    "--fabl": style.fabl + "px",
    "--fabbw": style.fabbw,
    "--fabbc": style.fabbc,
    "--faat": style.faat + "px",
    "--faal": style.faal + "px",
    "--faabw": arrowSize > 1 ? style.faabw : "0",
    "--faabc": style.faabc,
  }
  if (followParentWidth) {
    $style.width = targetRect.width + "px"
    $style["box-sizing"] = "border-box"
  }
  return $style as StyleValue
}
