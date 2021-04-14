export enum SwitchType {
  Tactile = "tactile",
  Clicky = "clicky",
  Linear = "linear",
}

export interface Switch {
  brand: string
  type: SwitchType
  force: number // grams
  lifecycle: number // millions of presses
}