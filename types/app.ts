import {
  Keyboard,
  KeyboardBacklighting,
  KeyboardFrameColor,
  KeyboardInterface,
  KeyboardSize,
  OperatingSystem,
} from "./keyboard"
import { SwitchType } from "./switch"

export interface UserPreferences {
  size: KeyboardSize[]
  compatible_oses: OperatingSystem
  interfaces: KeyboardInterface[]
  frame_color: KeyboardFrameColor
  primary_led_color: KeyboardBacklighting
  switch_type: SwitchType[]
}

export const defaultUserPreferences: UserPreferences = {
  size: [],
  compatible_oses: null,
  interfaces: [],
  frame_color: null,
  primary_led_color: null,
  switch_type: [],
}

export interface PickerProps {
  // productsFilteredByMultipleSelect: Keyboard[]
  products: Keyboard[]
  navigate: Function
  prefs: UserPreferences
  // setPrefs: Function // Marking unused, since we use the store to set preference values now
}

export interface FilterMetadata {}
