// CONVERT TO JSON BLOB....

export interface Question {
  text: string
  key: string
  choices: Choice[]
  pictorial: boolean
}

export interface Choice {
  text: string
  value: any
  imgPath: string
  toString?: Function
}

const getQuestions = (): Question[] => {
  const questions: Question[] = []
  const add = (x: Question) => questions.push(x)
  const q = (
    text: string,
    key: string,
    choices: Choice[],
    pictorial = false,
  ) => ({
    text,
    key,
    choices,
    pictorial,
  })

  const addQ = (text: string, key: string, choices, pictorial = false) =>
    add(q(text, key, choices, pictorial))

  const choice = (
    text: any,
    value: any,
    imgPath = "default",
    toString?: Function,
  ) => ({
    text,
    value,
    imgPath,
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

  addQ(
    "Which frame color?",
    "frame_color",
    [
      choice("White", "white", "light-frame"),
      choice("Black", "black", ""),
      choice("Gray", "gray", "dark-frame"),
    ],
    true,
  )

  return questions
}

export default getQuestions
