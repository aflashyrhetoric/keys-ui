import { useState } from "react"
import { useRouter } from "next/router"
import {
  Button,
  Loading,
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
import usePreferencesStore from "src/utils/local-storage"
import { localStorageKey } from "src/constants"

export enum QuizPhase {
  NotBegun = "NotBegun",
  Started = "Started",
  Finished = "Finished",
}

export default function Quiz() {
  const [loading, setLoading] = useState<boolean>(false)
  const [phase, setPhase] = useState<QuizPhase>(QuizPhase.NotBegun)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [products, setProducts] = useState([])
  const [prefs, setPrefs] = usePreferencesStore(localStorageKey, {})

  const router = useRouter()

  const updatePreferences = (update) => {
    setPrefs({ ...prefs, ...update })
  }

  const questions: Question[] = Questions()

  const moveToPreviousQuestion = () => setQuestionIndex(questionIndex - 1)
  const moveToNextQuestion = () => setQuestionIndex(questionIndex + 1)
  const canContinue = () => !!questions[questionIndex + 1]

  const setProductData = async () => {
    const resp = await loadProductData()
    const productData = JSON.parse(resp.data)

    console.log(productData)

    setProducts(productData)
  }

  return (
    <Page>
      <Loading active={loading} />
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
          </Button>
        )}

        {phase === QuizPhase.Started &&
          [questions[questionIndex]].map((q) => (
            <>
              <MultipleChoiceQuestion
                key={q.key}
                question={q}
                userPrefs={prefs}
                setUserPrefs={updatePreferences}
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
                {prefs && prefs[q.key] !== undefined && canContinue() && (
                  <Button
                    className={quizStyles.rightButton}
                    onClick={() => moveToNextQuestion()}
                  >
                    Next
                  </Button>
                )}
                {prefs && prefs[q.key] !== undefined && !canContinue() && (
                  <Button
                    className={quizStyles.rightButton}
                    onClick={() => {
                      setPhase(QuizPhase.Finished)
                      setLoading(true)
                      router.push("/configurator")
                    }}
                  >
                    See Results
                  </Button>
                )}
              </div>
            </>
          ))}
        {/* {phase === QuizPhase.Finished && (
          <>
            {Object.keys(prefs).map((preferenceKey) => {
              const q = getQuestionFromKey(questions, preferenceKey)
              return (
                <div>
                  <p></p>
                </div>
              )
            })}
            <ul>
              {!!products &&
                filterProducts(products, prefs, questions).map((product) => (
                  <p>{product.full_title}</p>
                ))}
            </ul>
          </>
        )} */}
      </div>
    </Page>
  )
}
