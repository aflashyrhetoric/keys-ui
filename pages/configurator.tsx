import React, { useEffect, useState } from "react"
import cStyles from "../styles/Configurator.module.scss"

import Questions, { Question } from "data/questions"
import UIShellPage from "templates/page-uishell"
import { loadProductData } from "src/utils/api-helpers"
import { Keyboard } from "types/keyboard"
import KeyboardPicker from "views/KeyboardPicker"
import SwitchPicker from "views/SwitchPicker"
import { View } from "types/views"

export default function Configurator() {
  // const [phase, setPhase] = useState<QuizPhase>(QuizPhase.NotBegun)
  // const [userPrefs, setUserPrefs] = useState<any>({})
  // const [questionIndex, setQuestionIndex] = useState(0)
  // const questions: Question[] = Questions()
  const [products, setProducts] = useState<Keyboard[]>([])
  const [activeView, setActiveView] = useState(View.KeyboardPicker)

  useEffect(() => {
    const setProductData = async () => {
      const response = await loadProductData()
      const rawData = response.data
      setProducts(JSON.parse(rawData))
    }

    setProductData()
  }, [])

  const viewMap = {
    [View.KeyboardPicker]: <KeyboardPicker products={products} />,
    [View.SwitchPicker]: <SwitchPicker products={products} />,
    // [View.KeycapPicker]: <KeyboardPicker products={products} />,
  }

  return (
    <UIShellPage title="Configurator" navigate={setActiveView}>
      {viewMap[activeView]}
    </UIShellPage>
  )
}
