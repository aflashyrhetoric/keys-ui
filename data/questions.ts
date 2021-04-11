// CONVERT TO JSON BLOB....

export interface Question {
  text: string
  key: string
  choices: Choice[]
}

export interface Choice {
  text: string
  value: any
  toString?: Function
  pictorial: boolean
}

const getQuestions = (): Question[] => {
  const questions: Question[] = []
  const add = (x: Question) => questions.push(x)
  const q = (text: string, key: string, choices: Choice[]) => ({
    text,
    key,
    choices,
  })

  const addQ = (text: string, key: string, choices) =>
    add(q(text, key, choices))

  const choice = (text: any, value: any, pictorial, toString?: Function) => ({
    text,
    value,
    pictorial,
    toString,
  })

  addQ("Do you want or require a numpad?", "numpad", [
    choice("Yes", true),
    choice("No", false),
  ])

  addQ("macOS or PC? (Or both?)", "compatible_oses", [
    choice("Windows", "windows"),
    choice("Mac", "mac"),
    choice("Both", "both"),
  ])

  addQ("Do you need Bluetooth capability?", "bluetooth", [
    choice("Yes, I need to be able to use the keyboard wirelessly.", true),
    choice("Nope - with or without is fine.", false),
  ])

  return questions
}

export default getQuestions
