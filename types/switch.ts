export enum SwitchType {
  Tactile = "tactile",
  Clicky = "clicky",
  Linear = "linear",
}

export const SwitchTypes = [
  SwitchType.Tactile,
  SwitchType.Clicky,
  SwitchType.Linear,
]

export interface Switch {
  brand: string
  type: SwitchType
  force: number // grams
  lifecycle: number // millions of presses
}
