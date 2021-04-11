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

  const c = (text: string, value: any, toString?: Function) => ({
    text,
    value,
    toString,
  })

  addQ("Do you want or require a numpad?", "numpad", [
    c("Yes", true),
    c("No", false),
  ])

  addQ("macOS or Windows? (Or both?)", "compatible_oses", [
    c("Windows", "windows"),
    c("Mac", "mac"),
    c("Both", "both"),
  ])

  return questions
}

export default getQuestions
