import { useState } from "react"
import {
  Button,
  ProgressIndicator,
  ProgressStep,
} from "carbon-components-react"
import { Rocket32 } from "@carbon/icons-react"
import styles from "../styles/Home.module.css"
import quizStyles from "../styles/Quiz.module.scss"

import Questions, {
  getQuestionFromKey,
  preferenceKeyToString,
  Question,
} from "data/questions"
import Page from "templates/page"
import MultipleChoiceQuestion from "src/quiz/MultipleChoice"
import { loadProductData } from "src/utils/api-helpers"
import { Keyboard } from "types/keyboard"
import { usePreferences } from "./_app"

export enum QuizPhase {
  NotBegun = "NotBegun",
  Started = "Started",
  Finished = "Finished",
}

const filterProducts = (
  products: Keyboard[],
  userPrefs: any,
  questions: any,
) => {
  let filteredSet = [...products]
  console.log(filteredSet)
  Object.keys(userPrefs).forEach((preferenceKey) => {
    console.log(`Filtering by ${preferenceKey}...`)
    const q = questions.find((q) => q.key === preferenceKey)
    // console.log(
    //   `Filtering by ${userPrefs[preferenceKey] || "No option chosen"}...`,
    // )
    console.log("BEFORE", filteredSet)
    filteredSet = filteredSet.filter((product) =>
      q.filterFunction(product, userPrefs[preferenceKey] || null),
    )
    console.log("AFTER", filteredSet)
  })
  return filteredSet
}

export default function Quiz() {
  const [phase, setPhase] = useState<QuizPhase>(QuizPhase.NotBegun)
  const [userPrefs, setUserPrefs] = useState<any>({})
  const [questionIndex, setQuestionIndex] = useState(0)
  const [products, setProducts] = useState([])

  const { prefs, updatePreferences } = usePreferences()

  const updatePrefs = (prefs) => {
    setUserPrefs(prefs)
    updatePreferences(prefs)
  }

  const moveToPreviousQuestion = () => setQuestionIndex(questionIndex - 1)
  const moveToNextQuestion = () => setQuestionIndex(questionIndex + 1)
  const canContinue = () => !!questions[questionIndex + 1]

  const questions: Question[] = Questions()
  console.log(questions)

  const setProductData = async () => {
    const resp = await loadProductData()
    const productData = JSON.parse(resp.data)

    console.log(productData)

    setProducts(productData)
  }

  return (
    <Page>
      <>
        <h1 className={styles.title}>{/* project:mk */}</h1>
        {phase !== QuizPhase.NotBegun && (
          <div
            style={{
              position: "absolute",
              top: "10%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProgressIndicator spaceEqually currentIndex={questionIndex}>
              {questions.map((q) => (
                <ProgressStep label={preferenceKeyToString(q.key)} />
              ))}
            </ProgressIndicator>
          </div>
        )}

        {phase === QuizPhase.NotBegun && (
          <p className={styles.description}>
            project:mk
            <br />
            quiz v0.1a
          </p>
        )}

        <div className={styles.grid}>
          {phase === QuizPhase.NotBegun && (
            <Button
              size="sm"
              kind="tertiary"
              renderIcon={Rocket32}
              onClick={() => setPhase(QuizPhase.Started)}
            >
              Start Quiz
              {JSON.stringify(prefs)}
            </Button>
          )}

          {phase === QuizPhase.Started &&
            [questions[questionIndex]].map((q) => (
              <>
                <MultipleChoiceQuestion
                  key={q.key}
                  question={q}
                  userPrefs={userPrefs}
                  setUserPrefs={setUserPrefs}
                  questionIndex={questionIndex}
                  setQuestionIndex={setQuestionIndex}
                  canContinue={canContinue}
                  moveToNextQuestion={moveToNextQuestion}
                  moveToPreviousQuestion={moveToPreviousQuestion}
                />
                <div className={quizStyles.buttonSet}>
                  {questionIndex > 0 && (
                    <Button
                      className={quizStyles.leftButton}
                      onClick={() => moveToPreviousQuestion()}
                    >
                      Back
                    </Button>
                  )}
                  {userPrefs &&
                    userPrefs[q.key] !== undefined &&
                    canContinue() && (
                      <Button
                        className={quizStyles.rightButton}
                        onClick={() => moveToNextQuestion()}
                      >
                        Next
                      </Button>
                    )}
                  {userPrefs &&
                    userPrefs[q.key] !== undefined &&
                    !canContinue() && (
                      <Button
                        className={quizStyles.rightButton}
                        onClick={() => {
                          setPhase(QuizPhase.Finished)
                          setProductData()
                        }}
                      >
                        See Results
                      </Button>
                    )}
                </div>
              </>
            ))}
          {phase === QuizPhase.Finished && (
            <>
              {Object.keys(userPrefs).map((preferenceKey) => {
                const q = getQuestionFromKey(questions, preferenceKey)
                return (
                  <div>
                    <p></p>
                  </div>
                )
              })}
              <ul>
                {!!products &&
                  filterProducts(
                    products,
                    userPrefs,
                    questions,
                  ).map((product) => <p>{product.full_title}</p>)}
              </ul>
            </>
          )}
        </div>
      </>
    </Page>
  )
}
