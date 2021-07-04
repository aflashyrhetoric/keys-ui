import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import getQuestions from "data/questions"
import { loadProductData, parseObject } from "src/utils/api-helpers"
import { Keyboard } from "types/keyboard"
import KeyboardPicker from "views/KeyboardPicker"
import SwitchPicker from "views/SwitchPicker"
import { View } from "types/views"
// import usePreferencesStore, { localStorageKey } from "src/utils/local-storage"
import { applyPreferenceFilter } from "src/shared/products"

export default function Configurator() {
  // const [
  //   productsFilteredByMultipleSelect,
  //   setProductsFilteredByMultipleSelect,
  // ] = useState<Keyboard[]>([])
  const [products, setProducts] = useState<Keyboard[]>([])
  const [activeView, setActiveView] = useState(View.KeyboardPicker)

  const prefs = useSelector(state => state.preferences)

  useEffect(() => {
    const setProductData = async () => {
      // const questions = getQuestions()
      const response = await loadProductData()
      const rawData = response.data

      const allProducts = rawData ? rawData.map(parseObject) : []

      const products = Object.keys(prefs).reduce(
        (acc, preferenceKey) =>
          applyPreferenceFilter(acc, preferenceKey, prefs[preferenceKey]),
        allProducts,
      )

      setProducts(products)
    }

    setProductData()
  }, [prefs])

  const sharedProps = {
    products,
    navigate: setActiveView,
    prefs,
  }

  const viewMap = {
    [View.KeyboardPicker]: <KeyboardPicker {...sharedProps} />,
    // [View.SwitchPicker]: <SwitchPicker {...sharedProps} />,
    // [View.KeycapPicker]: <KeyboardPicker products={products} />,
  }

  return <>{viewMap[activeView]}</>
}
