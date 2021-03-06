// CONVERT TO JSON BLOB....

import {
  Keyboard,
  KeyboardFrameColors,
  KeyboardInterface,
  KeyboardSize,
  OperatingSystem,
} from "types/keyboard"
import { startCase } from "lodash"
import { typeToLowerString, typeToString } from "src/utils/type-helpers"

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
  if (pk === "size") {
    return "Numpad?"
  }
  if (pk === "compatible_oses") {
    return "OS"
  }

  if (pk === "interfaces") {
    return "Connection"
  }

  if (pk === "primary_led_color") {
    return "Lighting"
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
    "size",
    [
      choice("Yes", [KeyboardSize.Full]), // MUST be full to have numpad
      choice("No", [KeyboardSize.Full, KeyboardSize.TKL, KeyboardSize.Sixty]),
      choice("Either is fine!", [
        KeyboardSize.Full,
        KeyboardSize.TKL,
        KeyboardSize.Sixty,
      ]),
    ],
    false,
    (product: Keyboard, cv: string) => {
      return cv.includes(product.size)
    },
  )

  addQ(
    "macOS or PC? (Or both?)",
    "compatible_oses",
    [
      choice("Windows", OperatingSystem.Windows),
      choice("Mac", OperatingSystem.macOS),
      choice("Both", OperatingSystem.Both),
    ],
    false,
    (product: Keyboard, comparisonValue: string) => {
      const cv = comparisonValue.toLowerCase()

      if (cv === null) {
        return true
      }

      // Since all keyboards are basically compatible with Windows by default, reflect that logic here
      const isWindowsCompatible =
        product.windows_compatible === null || product.windows_compatible
      const isMacCompatible = product.mac_compatible
      const isBoth = isWindowsCompatible && isMacCompatible

      if (cv === "both") {
        return isBoth
      }
      if (cv === "windows") {
        return isWindowsCompatible
      }
      if (cv === "macOS".toLowerCase()) {
        return isMacCompatible
      }

      return false
    },
  )

  addQ(
    "Wired or wireless?",
    "interfaces",
    [
      choice("Wired is fine", [
        KeyboardInterface.MicroUSB,
        KeyboardInterface.PS2,
        KeyboardInterface.MiniUSB,
        KeyboardInterface.USB,
        KeyboardInterface.USBC,
      ]),
      choice("Wireless", [KeyboardInterface.Wireless]),
    ],
    false,
    (product: Keyboard, value: KeyboardInterface[]) => {
      if (!value || value.length === 0) {
        return true
      }
      // TODO FIX THIS SHIT
      // Many wired keyboards have null values, so show it if it's null but we're looking for any wired connections
      if (
        product.interfaces === null &&
        [
          KeyboardInterface.MicroUSB,
          KeyboardInterface.PS2,
          KeyboardInterface.MiniUSB,
          KeyboardInterface.USB,
          KeyboardInterface.USBC,
        ].some(ki => value.includes(ki))
      ) {
        return true
      }

      if (product.interfaces === null) {
        return false
      }

      const { interfaces } = product

      const cv: string[] = value.map(typeToString)

      // Iterate through each of the product's interfaces
      // If any of them match our preferences, then include it
      return interfaces.map(typeToString).find(productInterface => {
        return cv.includes(typeToString(productInterface))
      })
    },
  ),
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
        const frameColor = product.frame_color
          ? product.frame_color.toLowerCase()
          : ""
        const cv = comparisonValue.toLowerCase()

        // console.log(frameColor)

        if (!frameColor) {
          return false
        }

        // If the data is missing, include the keyboard just in case
        if (!frameColor || cv === "any") {
          return true
        }

        const fc = frameColor.toLowerCase()

        if (KeyboardFrameColors.map(typeToLowerString).includes(cv)) {
          return fc === cv
        }
        if (cv === "colorful") {
          return ["pink", "blue", "green", "red", "orange"].includes(fc)
        }
      },
    )

  addQ(
    "RGB lighting lets you set custom colors, and sometimes, custom animations. Interested?",
    "primary_led_color",
    [
      choice("Yes", "rgb", "primary-led-color-rgb"),
      choice("White", "white", "primary-led-color-white"),
      choice("Not necessary", "n/a", "primary-led-color-none"),
    ],
    true,
    (product: Keyboard, comparisonValue: string) => {
      if (comparisonValue === "n/a") {
        return true
      }

      const color = product.primary_led_color
        ? product.primary_led_color.toLowerCase()
        : "n/a"

      if (comparisonValue === "rgb") {
        return color === "rgb" || color === "full"
      }
      if (comparisonValue === "white") {
        return color === "rgb" || color === "full" || color === "white"
      }

      return true
    },
  )

  return questions
}

export const getQuestionFromKey = (
  questions: Question[],
  questionKey: string,
) => questions.find(q => q.key === questionKey)

export default getQuestions
