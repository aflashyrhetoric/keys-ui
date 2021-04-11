// CONVERT TO JSON BLOB....

export interface Question {
  question: string
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
  const q = (question: string, key: string, choices: Choice[]) => ({
    question,
    key,
    choices,
  })
  const addQ = (question: string, key: string, choices) =>
    add(q(question, key, choices))
  const c = (text: string, value: any, toString?: Function) => ({
    text,
    value,
    toString,
  })

  addQ("Do you want or require a numpad?", "numpad", [
    c("Yes", true),
    c("No", false),
  ])

  return questions
}

export default getQuestions
