// CONVERT TO JSON BLOB....

import { Keyboard, KeyboardInterface } from "types/keyboard"

export interface Question {
  text: string
  key: string
  choices: Choice[]
  pictorial: boolean
}

export interface Choice {
  text: string
  value: any
  imgPath: string
  toString?: Function
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
    "Do you want or require a numpad?",
    "numpad",
    [choice("Yes", true), choice("No", false)],
    false,
    (product: Keyboard) => {
      return product.size === "Full Size"
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
    (product: Keyboard, comparisonValue: any) => {
      if (comparisonValue === "both") {
        return product.mac_compatible && product.windows_compatible
      }
      if (comparisonValue === "windows") {
        return product.windows_compatible
      }
      if (comparisonValue === "mac") {
        return product.mac_compatible
      }
    },
  )

  addQ(
    "Do you need Bluetooth capability?",
    "bluetooth",
    [
      choice("Yes, I need to be able to use the keyboard wirelessly.", true),
      choice("Nope - with or without is fine.", false),
    ],
    false,
    (product: Keyboard) =>
      product && product.interfaces !== ""
        ? product.interfaces.toLowerCase().includes(KeyboardInterface.Wireless)
        : false,
  )

  addQ(
    "Which frame color?",
    "frame_color",
    [
      choice("White", "white", "frame-color-white"),
      choice("Black", "black", "frame-color-black"),
      choice("Gray", "gray", "frame-color-gray"),
      choice("Colorful", "colorful", "frame-color-colorful"),
    ],
    true,
    (product: Keyboard, comparisonValue: string) => {
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
      const color = product.primary_led_color.toLowerCase()

      if (comparisonValue === "rgb") {
        return color === "rgb"
      }
      if (comparisonValue === "white") {
        return color === "white"
      }
      return true
    },
  )

  return questions
}

export default getQuestions
