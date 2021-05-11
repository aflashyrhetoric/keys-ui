import React, { useEffect, useState } from "react"

import getQuestions from "data/questions"
import { loadProductData } from "src/utils/api-helpers"
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
  // const [filterMetadata, setFilterMetadata] = useState<FilterMetadata>([])
  const [
    productsFilteredByMultipleSelect,
    setProductsFilteredByMultipleSelect,
  ] = useState<Keyboard[]>([])
  const [products, setProducts] = useState<Keyboard[]>([])
  const [activeView, setActiveView] = useState(View.KeyboardPicker)
  const [localPrefs, setLocalPrefs] = usePreferencesStore(localStorageKey, {})

  const [prefs, setPrefs] = useState(localPrefs)

  // Updates state as well as localStorage keys
  const updatePreferences = (preferences) => {
    const updated = {
      ...localPrefs,
      ...preferences,
    }
    setPrefs(updated)
    setLocalPrefs(updated)
  }

  useEffect(() => {
    const setProductData = async () => {
      const questions = getQuestions()
      const response = await loadProductData()
      const rawData = response.data
      const allProducts = JSON.parse(rawData)
      const productsFilteredByMultipleSelect = filterProductsByMultipleSelectsOnly(
        allProducts,
        prefs,
        questions,
      )
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
    setPrefs: updatePreferences,
  }

  const viewMap = {
    [View.KeyboardPicker]: <KeyboardPicker {...sharedProps} />,
    [View.SwitchPicker]: <SwitchPicker {...sharedProps} />,
    // [View.KeycapPicker]: <KeyboardPicker products={products} />,
  }

  return <>{viewMap[activeView]}</>
}
