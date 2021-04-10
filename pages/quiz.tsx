import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import quizStyles from "../styles/Quiz.module.scss"

import Questions from "data/questions"
import Page from "templates/page"

export default function Home() {
  const [started, setStarted] = useState(false)

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
            <div
              className={quizStyles.question}
              onClick={() => setStarted(true)}
            >
              <h3>Start quiz &rarr;</h3>
            </div>
          )}

          {started && (
            <div
              className={quizStyles.question}
              onClick={() => setStarted(true)}
            >
              <h3>{Questions()[0].question}</h3>
            </div>
          )}
        </div>
      </main>
    </Page>
  )
}
