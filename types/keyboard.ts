export enum KeyboardSize {
  Full = "Full Size",
  TKL = "Tenkeyless",
  Sixty = "60%",
  SixtyFive = "65%",
  Numpad = "Numpad",
}

export const KeyboardSizes = [
  KeyboardSize.Full,
  KeyboardSize.TKL,
  KeyboardSize.Sixty,
  KeyboardSize.SixtyFive,
  KeyboardSize.Numpad,
]

export enum OperatingSystem {
  Windows = "Windows",
  macOS = "macOS",
  Linux = "Linux",
  Both = "both",
}

export enum KeyboardInterface {
  USB = "USB",
  USBC = "USB-C",
  Wireless = "Wireless",
  MiniUSB = "Mini USB",
  MicroUSB = "Micro USB",
  PS2 = "PS/2",
}

export const KeyboardInterfaces = [
  KeyboardInterface.USB,
  KeyboardInterface.USBC,
  KeyboardInterface.Wireless,
  KeyboardInterface.MiniUSB,
  KeyboardInterface.MicroUSB,
  KeyboardInterface.PS2,
]

export enum KeyboardBacklighting {
  RGB = "RGB",
  White = "White",
  None = "n/a",
}

export const KeyboardBacklightingTypes = [
  KeyboardBacklighting.RGB,
  KeyboardBacklighting.White,
  KeyboardBacklighting.None,
]

export enum KeyboardFrameColor {
  White = "white",
  Black = "black",
  Gray = "gray",
  Red = "red",
  Green = "green",
  Navy = "navy",
  Wood = "wood",
  Blue = "blue",
  Yellow = "yellow",
  Silver = "silver",
  Clear = "clear",
  Pink = "pink",
}

export const KeyboardFrameColors = [
  KeyboardFrameColor.White,
  KeyboardFrameColor.Black,
  KeyboardFrameColor.Gray,
  KeyboardFrameColor.Red,
  KeyboardFrameColor.Green,
  KeyboardFrameColor.Navy,
  KeyboardFrameColor.Wood,
  KeyboardFrameColor.Blue,
  KeyboardFrameColor.Yellow,
  KeyboardFrameColor.Silver,
  KeyboardFrameColor.Clear,
  KeyboardFrameColor.Pink,
]

export enum KeyboardHotswappable {
  Yes = "Yes",
  No = "No",
}

export const KeyboardHotswappables = [
  KeyboardHotswappable.Yes,
  KeyboardHotswappable.No,
]

export interface Keyboard {
  id: string
  upc: string
  sku?: string
  brand: string
  available_switch_variants?: string[]
  full_title: string
  product_name: string
  product_description: string
  url: string
  img_path: string

  size: KeyboardSize | string
  price: string
  frame_color: string
  primary_led_color: KeyboardBacklighting | string
  hotswappable: KeyboardHotswappable | string
  interfaces: KeyboardInterface[]
  features: any[]

  windows_compatible: string
  mac_compatible: string
  linux_compatible: string

  dimensions: string
  weight: string // float, lbs

  // has_multimedia_keys: boolean
  // cord_length: number // inches
  // switch_stems: string

  // REDIS TYPES
  _type: string
}
