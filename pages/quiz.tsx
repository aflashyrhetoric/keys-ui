import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import quizStyles from "../styles/Quiz.module.scss"

import Questions, { Question } from "data/questions"
import Page from "templates/page"
import MultipleChoiceQuestion from "src/quiz/MultipleChoice"

export default function Quiz() {
  const [started, setStarted] = useState(false)
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

        {!started && (
          <p className={styles.description}>
            project:mk
            <br />
            quiz v0.1a
          </p>
        )}

        <div className={styles.grid}>
          {!started && (
            <div className={quizStyles.button} onClick={() => setStarted(true)}>
              <span>Start quiz &rarr;</span>
            </div>
          )}

          {started &&
            [questions[questionIndex]].map((q) => (
              <MultipleChoiceQuestion
                question={q}
                formState={formState}
                setFormState={setFormState}
                questionIndex={questionIndex}
                setQuestionIndex={setQuestionIndex}
                canContinue={canContinue}
                moveToNextQuestion={moveToNextQuestion}
                moveToPreviousQuestion={moveToPreviousQuestion}
              />
            ))}
        </div>
      </main>
    </Page>
  )
}
