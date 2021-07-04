/*
 * This is a list of shared helper functions for products
 * This is NOT a React component - don't be misled by the .tsx extension :)
 */
import { Tag } from "carbon-components-react"
import { typeToLowerString, typeToString } from "src/utils/type-helpers"
import { UserPreferences } from "types/app"
import {
  Keyboard,
  KeyboardFrameColors,
  KeyboardInterface,
} from "types/keyboard"

// Filtering is subtractive, except for "size"
export const applyPreferenceFilter = (
  productList,
  filterKey,
  comparisonValue,
) => {
  // If there's already no results, just skip filtering.
  if (productList.length === 0) {
    return []
  }

  // If there is no comparison value, skip the filtering for that property
  if (comparisonValue === null) {
    // The only exception is "size", for which we should include everything
    if (filterKey === "size") {
      return []
    } else {
      return productList
    }
  }

  const cv =
    typeof comparisonValue === "string"
      ? comparisonValue.toLowerCase()
      : comparisonValue.map(s => s.toLowerCase())

  // Cache filter func outside so it didn't get
  const filterFunc = productFilterReducer(filterKey)
  return productList.filter(product => filterFunc(product, cv))
}

export const productFilterReducer = (filterKey): Function => {
  switch (filterKey) {
    case "size":
      return (product: Keyboard, cv: string) => cv.includes(product.size)
    case "compatible_oses":
      return (product: Keyboard, comparisonValue: string) => {
        if (comparisonValue === null) {
          return true
        }

        const cv = comparisonValue.toLowerCase()

        // Since all keyboards are basically compatible with Windows by default, reflect that logic here
        const isWindowsCompatible =
          product.windows_compatible === null || product.windows_compatible
        const isMacCompatible = product.mac_compatible
        const isBoth = isWindowsCompatible && isMacCompatible

        if (cv === "both") {
          return isBoth
        }
        if (cv === "windows") {
          return isWindowsCompatible
        }
        if (cv === "macOS".toLowerCase()) {
          return isMacCompatible
        }

        return false
      }
    case "interfaces":
      return (product: Keyboard, value: KeyboardInterface[]) => {
        if (!value || value.length === 0) {
          return true
        }
        // TODO FIX THIS SHIT
        // Many wired keyboards have null values, so show it if it's null but we're looking for any wired connections
        if (
          product.interfaces === null &&
          [
            KeyboardInterface.MicroUSB,
            KeyboardInterface.PS2,
            KeyboardInterface.MiniUSB,
            KeyboardInterface.USB,
            KeyboardInterface.USBC,
          ].some(ki => value.includes(ki))
        ) {
          return true
        }

        if (product.interfaces === null) {
          return false
        }

        const { interfaces } = product

        const cv: string[] = value.map(typeToString)

        // Iterate through each of the product's interfaces
        // If any of them match our preferences, then include it
        return interfaces.map(typeToString).find(productInterface => {
          return cv.includes(typeToString(productInterface))
        })
      }
    case "frame_color":
      return (product: Keyboard, comparisonValue: string) => {
        if (comparisonValue === null) {
          return false
        }

        const frameColor = product.frame_color
          ? product.frame_color.toLowerCase()
          : ""

        const cv = comparisonValue.toLowerCase()

        if (!frameColor) {
          return false
        }

        // If the data is missing, include the keyboard just in case
        if (!frameColor || cv === "any") {
          return true
        }

        const fc = frameColor.toLowerCase()

        if (KeyboardFrameColors.map(typeToLowerString).includes(cv)) {
          return fc === cv
        }
        if (cv === "colorful") {
          return ["pink", "blue", "green", "red", "orange"].includes(fc)
        }
      }
    case "primary_led_color":
      return (product: Keyboard, comparisonValue: string) => {
        if (comparisonValue === "n/a") {
          return true
        }

        const color = product.primary_led_color
          ? product.primary_led_color.toLowerCase()
          : "n/a"

        if (comparisonValue === "rgb") {
          return color === "rgb" || color === "full"
        }
        if (comparisonValue === "white") {
          return color === "rgb" || color === "full" || color === "white"
        }

        return true
      }
    case "switch_type":
      return () => true
    default:
      console.error(
        `${filterKey} has no sorting function - write one in products.tsx`,
      )
  }
}

export const userPreferencesToTags = (prefs: UserPreferences): JSX.Element => {
  if (!prefs) {
    return <>No filters</>
  }
  const tags = []
  const sizeTags = prefs?.size?.map(keyboardSize => (
    <Tag key={`${keyboardSize}-keyboardSize`} type="purple">
      Size: {keyboardSize}
    </Tag>
  ))

  const portTags =
    prefs &&
    prefs.interfaces &&
    prefs.interfaces.map(kbPort => (
      <Tag key={`${kbPort}-kbPort`} type="magenta">
        Port: {kbPort}
      </Tag>
    ))

  return (
    <>
      {sizeTags}
      <Tag type="blue">Frame Color: {prefs.frame_color}</Tag>
      <Tag type="teal">LED Backlighting: {prefs.primary_led_color}</Tag>
      {portTags}
    </>
  )
}
