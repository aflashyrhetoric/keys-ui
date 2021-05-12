import { Keyboard, KeyboardInterface, KeyboardSize } from "./keyboard"

export interface UserPreferences {
  size: KeyboardSize[]
  compatible_oses: "windows" | "mac" | "both" | string
  interfaces: KeyboardInterface[]
  frame_color: "black" | "white" | "gray" | "navy" | string
  primary_led_color: "rgb" | "white" | "n/a" | string
}

export interface PickerProps {
  productsFilteredByMultipleSelect: Keyboard[]
  products: Keyboard[]
  navigate: Function
  prefs: UserPreferences
  setPrefs: Function
}

export interface FilterMetadata {}
