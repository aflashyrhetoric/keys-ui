import { useEffect, useState } from "react"
import {
  Button,
  ProgressIndicator,
  ProgressStep,
} from "carbon-components-react"
import styles from "../styles/Home.module.css"
import cStyles from "../styles/Configurator.module.scss"

import Questions, {
  getQuestionFromKey,
  preferenceKeyToString,
  Question,
} from "data/questions"
import UIShellPage from "templates/page-uishell"
import MultipleChoiceQuestion from "src/quiz/MultipleChoice"
import { loadProductData } from "src/utils/api-helpers"
import { Keyboard } from "types/keyboard"

export default function Quiz() {
  // const [phase, setPhase] = useState<QuizPhase>(QuizPhase.NotBegun)
  // const [userPrefs, setUserPrefs] = useState<any>({})
  // const [questionIndex, setQuestionIndex] = useState(0)
  const [products, setProducts] = useState([])

  const questions: Question[] = Questions()

  useEffect(() => {
    const setProductData = async () =>
      setProducts(JSON.parse(await loadProductData()))

    setProductData()
  }, [])

  return (
    <UIShellPage title="Configurator">
      <></>
    </UIShellPage>
  )
}
