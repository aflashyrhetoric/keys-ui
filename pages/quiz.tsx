import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import quizStyles from "../styles/Quiz.module.scss"

import Questions, { Question } from "data/questions"
import Page from "templates/page"
import MultipleChoiceQuestion from "src/quiz/MultipleChoice"

export enum QuizPhase {
  NotBegun = "NotBegun",
  Started = "Started",
  Finished = "Finished",
}

export default function Quiz() {
  const [phase, setPhase] = useState<QuizPhase>(QuizPhase.NotBegun)
  const [formState, setFormState] = useState({})
  const [questionIndex, setQuestionIndex] = useState(0)

  const moveToPreviousQuestion = () => setQuestionIndex(questionIndex - 1)
  const moveToNextQuestion = () => setQuestionIndex(questionIndex + 1)
  const canContinue = () => !!questions[questionIndex + 1]

  const questions: Question[] = Questions()

  return (
    <Page>
      <main className={styles.main}>
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
            [questions[questionIndex]].map((q) => (
              <>
                <MultipleChoiceQuestion
                  key={q.key}
                  question={q}
                  formState={formState}
                  setFormState={setFormState}
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
                  {formState &&
                    formState[q.key] !== undefined &&
                    canContinue() && (
                      <button
                        className={quizStyles.rightButton}
                        onClick={() => moveToNextQuestion()}
                      >
                        Next
                      </button>
                    )}
                  {formState &&
                    formState[q.key] !== undefined &&
                    !canContinue() && (
                      <button
                        className={quizStyles.rightButton}
                        onClick={() => setPhase(QuizPhase.Finished)}
                      >
                        See Results
                      </button>
                    )}
                </div>
              </>
            ))}
          {phase === QuizPhase.Finished && JSON.stringify(formState, null, 2)}
        </div>
      </main>
    </Page>
  )
}
