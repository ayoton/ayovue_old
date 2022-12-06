import { customRef } from "vue"

export interface UseDateFormatOptions {
  /**
   * The locale(s) to used for dd/ddd/dddd/MMM/MMMM format
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
   */
  locales?: Intl.LocalesArgument

  /**
   * A custom function to re-modify the way to display meridiem
   *
   */
  customMeridiem?: (
    hours: number,
    minutes: number,
    isLowercase?: boolean,
    hasPeriod?: boolean
  ) => string
}

const REGEX_PARSE =
  /* #__PURE__ */ /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
const REGEX_FORMAT =
  /* #__PURE__ */ /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g

const defaultMeridiem = (
  hours: number,
  minutes: number,
  isLowercase?: boolean,
  hasPeriod?: boolean
) => {
  let m = hours < 12 ? "AM" : "PM"
  if (hasPeriod) m = m.split("").reduce((acc, curr) => (acc += `${curr}.`), "")
  return isLowercase ? m.toLowerCase() : m
}

export const formatDate = (
  date: Date,
  formatStr: string,
  options: UseDateFormatOptions = {}
) => {
  const years = date.getFullYear()
  const month = date.getMonth()
  const days = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  const day = date.getDay()
  const meridiem = options.customMeridiem ?? defaultMeridiem
  const matches: Record<string, () => string | number> = {
    YY: () => String(years).slice(-2),
    YYYY: () => years,
    M: () => month + 1,
    MM: () => `${month + 1}`.padStart(2, "0"),
    MMM: () => date.toLocaleDateString(options.locales, { month: "short" }),
    MMMM: () => date.toLocaleDateString(options.locales, { month: "long" }),
    D: () => String(days),
    DD: () => `${days}`.padStart(2, "0"),
    H: () => String(hours),
    HH: () => `${hours}`.padStart(2, "0"),
    h: () => `${hours % 12 || 12}`.padStart(1, "0"),
    hh: () => `${hours % 12 || 12}`.padStart(2, "0"),
    m: () => String(minutes),
    mm: () => `${minutes}`.padStart(2, "0"),
    s: () => String(seconds),
    ss: () => `${seconds}`.padStart(2, "0"),
    SSS: () => `${milliseconds}`.padStart(3, "0"),
    d: () => day,
    dd: () => date.toLocaleDateString(options.locales, { weekday: "narrow" }),
    ddd: () => date.toLocaleDateString(options.locales, { weekday: "short" }),
    dddd: () => date.toLocaleDateString(options.locales, { weekday: "long" }),
    A: () => meridiem(hours, minutes),
    AA: () => meridiem(hours, minutes, false, true),
    a: () => meridiem(hours, minutes, true),
    aa: () => meridiem(hours, minutes, true, true),
  }
  return formatStr.replace(REGEX_FORMAT, (match, $1) => $1 || matches[match]())
}

// export type UseDateFormatReturn = ReturnType<typeof useDateFormat>

/**
 *
 * @param {Date} value
 */
export const useDate = (value: Date | string | number) => {
  return customRef((track, trigger) => {
    class AyoDate extends Date {
      setDate(arg: number) {
        const _ = super.setDate(arg)
        trigger()
        return _
      }
      setFullYear(
        year: number,
        month?: number | undefined,
        date?: number | undefined
      ): number {
        const _ = super.setFullYear(year, month, date)
        trigger()
        return _
      }
      setHours(
        hours: number,
        min?: number | undefined,
        sec?: number | undefined,
        ms?: number | undefined
      ): number {
        const _ = super.setHours(hours, min, sec, ms)
        trigger()
        return _
      }
      setMilliseconds(ms: number): number {
        const _ = super.setMilliseconds(ms)
        trigger()
        return _
      }
      setMinutes(
        min: number,
        sec?: number | undefined,
        ms?: number | undefined
      ): number {
        const _ = super.setMinutes(min, sec, ms)
        trigger()
        return _
      }
      setMonth(month: number, date?: number | undefined): number {
        const _ = super.setMonth(month, date)
        trigger()
        return _
      }
      setSeconds(sec: number, ms?: number | undefined): number {
        const _ = super.setSeconds(sec, ms)
        trigger()
        return _
      }
      setTime(time: number): number {
        const _ = super.setTime(time)
        trigger()
        return _
      }
      setUTCDate(date: number): number {
        const _ = super.setUTCDate(date)
        trigger()
        return _
      }
      setUTCFullYear(
        year: number,
        month?: number | undefined,
        date?: number | undefined
      ): number {
        const _ = super.setUTCFullYear(year, month, date)
        trigger()
        return _
      }
      setUTCHours(
        hours: number,
        min?: number | undefined,
        sec?: number | undefined,
        ms?: number | undefined
      ): number {
        const _ = super.setUTCHours(hours, min, sec, ms)
        trigger()
        return _
      }
      setUTCMilliseconds(ms: number): number {
        const _ = super.setUTCMilliseconds(ms)
        trigger()
        return _
      }
      setUTCMinutes(
        min: number,
        sec?: number | undefined,
        ms?: number | undefined
      ): number {
        const _ = super.setUTCMinutes(min, sec, ms)
        trigger()
        return _
      }
      setUTCMonth(month: number, date?: number | undefined): number {
        const _ = super.setUTCMonth(month, date)
        trigger()
        return _
      }
      setUTCSeconds(sec: number, ms?: number | undefined): number {
        const _ = super.setUTCSeconds(sec, ms)
        trigger()
        return _
      }
      format(formatStr = "HH:mm:ss", options = {}) {
        return formatDate(this, formatStr, options)
      }
    }
    let _temVal = new AyoDate(value)
    return {
      get() {
        track()
        return _temVal
      },
      set(_value) {
        _temVal = new AyoDate(_value)
        trigger()
      },
    }
  })
}
