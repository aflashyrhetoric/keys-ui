import React, { useEffect, useState } from "react"
import cStyles from "../styles/Configurator.module.scss"

import getQuestions from "data/questions"
import UIShellPage from "templates/page-uishell"
import { loadProductData } from "src/utils/api-helpers"
import { Keyboard } from "types/keyboard"
import KeyboardPicker from "views/KeyboardPicker"
import SwitchPicker from "views/SwitchPicker"
import { View } from "types/views"
import usePreferencesStore from "src/utils/local-storage"
import { localStorageKey } from "src/constants"
import { filterProducts } from "src/shared/products"

export default function Configurator() {
  // const [phase, setPhase] = useState<QuizPhase>(QuizPhase.NotBegun)
  // const [userPrefs, setUserPrefs] = useState<any>({})
  // const [questionIndex, setQuestionIndex] = useState(0)
  // const questions: Question[] = Questions()
  const [products, setProducts] = useState<Keyboard[]>([])
  const [activeView, setActiveView] = useState(View.KeyboardPicker)
  const [prefs, setPrefs] = usePreferencesStore(localStorageKey, {})

  useEffect(() => {
    const setProductData = async () => {
      const questions = getQuestions()
      const response = await loadProductData()
      const rawData = response.data
      const products = filterProducts(JSON.parse(rawData), prefs, questions)
      setProducts(products)
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
