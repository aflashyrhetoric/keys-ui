interface Question {
  question: string
  choices: any
}

interface Choice {
  text: string
  value: any
  toString?: Function
}

const getQuestions = (): Question[] => {
  const questions: Question[] = []
  const add = (x: Question) => questions.push(x)
  const q = (question: string, choices: Choice[]) => ({
    question,
    choices,
  })
  const addQ = (question: string, choices) => add(q(question, choices))
  const c = (text: string, value: any, toString?: Function) => ({
    text,
    value,
    toString,
  })

  addQ("Do you want or require a numpad?", [c("Yes", true), c("No", false)])

  return questions
}

export default getQuestions
