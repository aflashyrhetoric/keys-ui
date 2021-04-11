import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import quizStyles from "../styles/Quiz.module.scss"

import Questions, { Question } from "data/questions"
import Page from "templates/page"

export default function Quiz() {
  const [started, setStarted] = useState(false)
  const [formState, setFormState] = useState({})

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
              <h3>Start quiz &rarr;</h3>
            </div>
          )}

          {started &&
            questions.map((q) => (
              <div>
                <h3>{q.question}</h3>
                {q.choices.map((choice) => (
                  <ul className={quizStyles.choiceContainer}>
                    <li
                      className={quizStyles.choice}
                      onClick={() =>
                        setFormState({ ...formState, [q.key]: choice.value })
                      }
                    >
                      {choice.text}
                    </li>
                  </ul>
                ))}
              </div>
            ))}
        </div>
      </main>
    </Page>
  )
}
