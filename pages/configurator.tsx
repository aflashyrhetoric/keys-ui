import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import getQuestions from "data/questions"
import { loadProductData, parseObject } from "src/utils/api-helpers"
import { Keyboard } from "types/keyboard"
import KeyboardPicker from "views/KeyboardPicker"
import SwitchPicker from "views/SwitchPicker"
import { View } from "types/views"
import usePreferencesStore, { localStorageKey } from "src/utils/local-storage"
import {
  filterProducts,
  filterProductsByMultipleSelectsOnly,
} from "src/shared/products"

export default function Configurator() {
  const [
    productsFilteredByMultipleSelect,
    setProductsFilteredByMultipleSelect,
  ] = useState<Keyboard[]>([])
  const [products, setProducts] = useState<Keyboard[]>([])
  const [activeView, setActiveView] = useState(View.KeyboardPicker)

  // const [prefs, setPrefs] = useState(localPrefs)
  const prefs = useSelector(state => state.preferences)

  // No longer needed, since the logic for updating the state belongs in the store, rather than using hooks.
  // const updatePreferences = preferences => {
  //   const updated = {
  //     ...localPrefs,
  //     ...preferences,
  //   }
  //   setPrefs(updated)
  // }

  useEffect(() => {
    const setProductData = async () => {
      const questions = getQuestions()
      const response = await loadProductData()
      const rawData = response.data
      // console.log(rawData)
      // const allProducts = JSON.parse(rawData)
      const allProducts = rawData ? rawData.map(parseObject) : []
      const productsFilteredByMultipleSelect =
        filterProductsByMultipleSelectsOnly(allProducts, prefs, questions)
      const products = filterProducts(allProducts, prefs, questions)

      // setFilterMetadata(computeFilterMetadata(allProducts))
      setProductsFilteredByMultipleSelect(productsFilteredByMultipleSelect)
      setProducts(products)
    }

    setProductData()
  }, [prefs])

  const sharedProps = {
    products,
    productsFilteredByMultipleSelect,
    navigate: setActiveView,
    prefs,
  }

  const viewMap = {
    [View.KeyboardPicker]: <KeyboardPicker {...sharedProps} />,
    [View.SwitchPicker]: <SwitchPicker {...sharedProps} />,
    // [View.KeycapPicker]: <KeyboardPicker products={products} />,
  }

  return <>{viewMap[activeView]}</>
}
