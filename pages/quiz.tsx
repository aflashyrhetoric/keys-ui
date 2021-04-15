import { useState, useMemo } from "react"
import styles from "../styles/Home.module.css"
import quizStyles from "../styles/Quiz.module.scss"

import Questions, { Question } from "data/questions"
import Page from "templates/page"
import MultipleChoiceQuestion from "src/quiz/MultipleChoice"
import { loadProductData } from "src/utils/api-helpers"

export enum QuizPhase {
  NotBegun = "NotBegun",
  Started = "Started",
  Finished = "Finished",
}

export default function Quiz() {
  const [phase, setPhase] = useState<QuizPhase>(QuizPhase.NotBegun)
  const [userPrefs, setUserPrefs] = useState<any>({})
  const [questionIndex, setQuestionIndex] = useState(0)
  const [products, setProducts] = useState([])

  const moveToPreviousQuestion = () => setQuestionIndex(questionIndex - 1)
  const moveToNextQuestion = () => setQuestionIndex(questionIndex + 1)
  const canContinue = () => !!questions[questionIndex + 1]

  const questions: Question[] = Questions()

  const setProductData = async () => {
    const resp = await loadProductData()
    const productData = JSON.parse(resp.data)

    console.log(productData)

    setProducts(productData)
  }

  const filterProducts = () => {
    // const filteredSet = [...products]
    // for (const [key, value] of Object.entries(userPrefs)) {
      
    // }

   let filteredSet = []
   Object.keys(userPrefs).forEach(preferenceKey => {
    filteredSet = userPrefs.filter()
   })
  }

  return (
    <Page>
      <>
        <h1 className={styles.title}>{/* project:mk */}</h1>

        {phase === QuizPhase.NotBegun && (
          <p className={styles.description}>
            project:mk
            <br />
            quiz v0.1a
          </p>
        )}

        <div className={styles.grid}>
          {phase === QuizPhase.NotBegun && (
            <div
              className={quizStyles.button}
              onClick={() => setPhase(QuizPhase.Started)}
            >
              <span>Start quiz &rarr;</span>
            </div>
          )}

          {phase === QuizPhase.Started &&
            [questions[questionIndex]].map(q => (
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
                    <button
                      className={quizStyles.leftButton}
                      onClick={() => moveToPreviousQuestion()}
                    >
                      Back
                    </button>
                  )}
                  {userPrefs &&
                    userPrefs[q.key] !== undefined &&
                    canContinue() && (
                      <button
                        className={quizStyles.rightButton}
                        onClick={() => moveToNextQuestion()}
                      >
                        Next
                      </button>
                    )}
                  {userPrefs &&
                    userPrefs[q.key] !== undefined &&
                    !canContinue() && (
                      <button
                        className={quizStyles.rightButton}
                        onClick={() => {
                          setPhase(QuizPhase.Finished)
                          setProductData()
                        }}
                      >
                        See Results
                      </button>
                    )}
                </div>
              </>
            ))}
          {phase === QuizPhase.Finished && (
            <>
              {/* {JSON.stringify(userPrefs, null, 2)} */}
              {/* {JSON.stringify(products, null, 2)} */}
              <ul>
                {!!products &&
                  products
                    .filter(productData => {
                      const { frame_color } = productData
                      return frame_color.toLowerCase() === userPrefs.frame_color
                    })
                    .map(product => <p>{product.full_title}</p>)}
              </ul>
            </>
          )}
        </div>
      </>
    </Page>
  )
}
