import { Keyboard, KeyboardSize } from "./keyboard"

export interface UserPreferences {
  size: KeyboardSize[]
  compatible_oses: "yes" | "no" | string
  interfaces: "yes" | "no" | string
  frame_color: "black" | "white" | "gray" | "navy" | string
  primary_led_color: "rgb" | "white" | "n/a" | string
}

export interface PickerProps {
  products: Keyboard[]
  navigate: Function
  prefs: UserPreferences
  setPrefs: Function
}
