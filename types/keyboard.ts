export enum KeyboardSize {
  Full = "Full Size",
  TKL = "Tenkeyless",
  Sixty = "60%",
  Numpad = "Numpad",
}

export enum KeyboardInterface {
  USB_C = "USB-C",
  Wireless = "Wireless",
  Mini_USB = "Mini USB",
}

export enum KeyboardBacklighting {
  RGB = "RGB",
  White = "White",
  None = "n/a",
}

export interface Keyboard {
  brand: string
  full_title: string
  product_name: string
  size: KeyboardSize
  price: string;
  frame_color: string
  primary_led_color: KeyboardBacklighting
  hotswappable: boolean
  has_multimedia_keys: boolean
  interfaces: string
  features: any[]

  windows_compatible: string
  mac_compatible: string
  linux_compatible: string

  dimensions: string
  weight: number // float, lbs
  cord_length: number // inches
  switch_stems: string
}
