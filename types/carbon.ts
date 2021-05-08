interface SimpleEvent {
  target: {
    name: string
    value: string
  }
}

export interface CheckboxEvent {
  value: any
  id: string
  event: SimpleEvent
}
