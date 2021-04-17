// CONVERT TO JSON BLOB....

import { Keyboard, KeyboardInterface } from "types/keyboard"
import { startCase } from "lodash"

export interface Question {
  text: string
  key: string
  choices: Choice[]
  pictorial: boolean
  filterFunction?: Function
}

export interface Choice {
  text: string
  value: any
  imgPath: string
  toString?: Function
}

export const preferenceKeyToString = (pk: string) => {
  if (pk === "numpad") {
    return "Numpad?"
  }
  if (pk === "compatible_oses") {
    return "OS"
  }

  if (pk === "interfaces") {
    return "Connection"
  }

  return startCase(pk)
}

const getQuestions = (): Question[] => {
  const questions: Question[] = []
  const add = (x: Question) => questions.push(x)
  const q = (
    text: string,
    key: string,
    choices: Choice[],
    pictorial = false,
    filterFunction: Function,
  ) => ({
    text,
    key,
    choices,
    pictorial,
    filterFunction,
  })

  const addQ = (
    text: string,
    key: string,
    choices,
    pictorial = false,
    filterFunction,
  ) => add(q(text, key, choices, pictorial, filterFunction))

  const choice = (
    text: any,
    value: any,
    imgPath = "default",
    note?: string,
  ) => ({
    text,
    value,
    imgPath,
    note,
  })

  addQ(
    "Do you need a keyboard with a numpad?",
    "numpad",
    [
      choice("Yes", "yes"),
      choice("No", "no"),
      choice("Either is fine!", "either"),
    ],
    false,
    (product: Keyboard, cv: string) => {
      if (cv === "yes") {
        return product.size === "Full Size"
      }
      if (cv === "no") {
        return product.size !== "Full Size"
      }
      return true
    },
  )

  addQ(
    "macOS or PC? (Or both?)",
    "compatible_oses",
    [
      choice("Windows", "windows"),
      choice("Mac", "mac"),
      choice("Both", "both"),
    ],
    false,
    (product: Keyboard, comparisonValue: string) => {
      const cv = comparisonValue.toLowerCase()

      console.log()

      if (cv === null) {
        return true
      }

      // Since all keyboards are basically compatible with Windows by default, reflect that logic here
      const isWindowsCompatible =
        product.windows_compatible === null ||
        product.windows_compatible.toLowerCase() === "yes"
      const isMacCompatible =
        product.mac_compatible && product.mac_compatible.toLowerCase() === "yes"
      const isBoth = isWindowsCompatible && isMacCompatible

      if (cv === "both") {
        return isBoth
      }
      if (cv === "windows") {
        return isWindowsCompatible
      }
      if (cv === "mac") {
        return isMacCompatible
      }

      return false
    },
  )

  addQ(
    "Wired or wireless?",
    "interfaces",
    [
      choice(
        "Wireless",
        "wireless",
      ),
      choice("Wired is fine", "either"),
    ],
    false,
    (product: Keyboard, value: string) => {
      if (!product || !product.interfaces) {
        return false
      }

      if (value === "either") {
        return true
      }
      return product.interfaces.includes(KeyboardInterface.Wireless)
    },
  )

  addQ(
    "Which frame color?",
    "frame_color",
    [
      choice("White", "white", "frame-color-white"),
      choice("Black", "black", "frame-color-black"),
      choice("Gray", "gray", "frame-color-gray"),
      choice("Colorful", "colorful", "frame-color-colorful"),
      choice("Any", "any", "default"),
    ],
    true,
    (product: Keyboard, comparisonValue: string) => {
      if (!product.frame_color) {
        return false
      }
      // If the data is missing, include the keyboard just in case
      if (!product.frame_color || comparisonValue === "any") {
        return true
      }

      const fc = product.frame_color.toLowerCase()

      if (comparisonValue === "black") {
        return fc === "black"
      }
      if (comparisonValue === "white") {
        return fc === "white"
      }
      if (comparisonValue === "gray") {
        return fc === "gray"
      }
      if (comparisonValue === "colorful") {
        return ["pink", "blue", "green", "red"].includes(fc)
      }
    },
  )

  // addQ(
  //   "RGB lighting lets you set custom colors, and sometimes, custom animations. Interested?",
  //   "primary_led_color",
  //   [
  //     choice("Yes", "rgb", "primary-led-color-rgb"),
  //     choice("White", "white", "primary-led-color-white"),
  //     choice("Not necessary", "n/a", "primary-led-color-none"),
  //   ],
  //   true,
  //   (product: Keyboard, comparisonValue: string) => {
  //     const color = product.primary_led_color
  //       ? product.primary_led_color.toLowerCase()
  //       : "n/a"

  //     if (comparisonValue === "rgb") {
  //       return color === "rgb" || color === "full"
  //     }
  //     if (comparisonValue === "white") {
  //       return color === "white"
  //     }
  //     return true
  //   },
  // )

  return questions
}

export const getQuestionFromKey = (
  questions: Question[],
  questionKey: string,
) => questions.find(q => q.key === questionKey)

export default getQuestions
