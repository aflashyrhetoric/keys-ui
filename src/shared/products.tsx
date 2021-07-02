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

const applyFilters = (productList, filterKey, comparisonValue) => {
  return productList.reduce(
    (acc, val) => productFilterReducer(acc, filterKey)(val, comparisonValue),
    productList,
  )
}

export const productFilterReducer = (productList, filterKey) => {
  switch (filterKey) {
    case "size":
      return productList.filter((product: Keyboard, cv: string) => {
        return cv.includes(product.size)
      })
    case "compatible_oses":
      return productList.filter(
        (product: Keyboard, comparisonValue: string) => {
          const cv = comparisonValue.toLowerCase()

          if (cv === null) {
            return true
          }

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
        },
      )
    case "interfaces":
      return productList.filter(
        (product: Keyboard, value: KeyboardInterface[]) => {
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
        },
      )
    case "frame_color":
      return productList.filter(
        (product: Keyboard, comparisonValue: string) => {
          const frameColor = product.frame_color
            ? product.frame_color.toLowerCase()
            : ""
          const cv = comparisonValue.toLowerCase()

          // console.log(frameColor)

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
        },
      )
    case "primary_led_color":
      return productList.filter(
        (product: Keyboard, comparisonValue: string) => {
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
        },
      )
  }
}

export const filterProducts = (
  products: Keyboard[],
  userPrefs: any,
  questions: any,
) => {
  // TODO
  return products
  let filteredSet = [...products]
  // console.log(filteredSet)
  Object.keys(userPrefs).forEach(preferenceKey => {
    console.log(
      `Filtering by ${preferenceKey} [${userPrefs[preferenceKey]}]...`,
    )
    const q = questions.find(q => q.key === preferenceKey)
    // console.log(
    //   `Filtering by ${userPrefs[preferenceKey] || "No option chosen"}...`,
    // )
    console.log("BEFORE", filteredSet)
    filteredSet = filteredSet.filter(product =>
      q.filterFunction(product, userPrefs[preferenceKey] || null),
    )
    console.log("AFTER", filteredSet, "\n")
  })
  return filteredSet
}

// Some filters are single-select, like frame_color.
// Filtering out all the products by multiple select options only can allow the single-select options to get a preview of
//   how many products exist for that filter specifically.

// For example, "size" is multiple-select.
// If we filter by size, but then do NOT filter by, say, frame_color,
// Then we can now get a count of the post-size filter, but filtered by EACH frame_color
// When that number is zero, we can disable checkboxes (or omit them) to make for a more dynamic experience
export const filterProductsByMultipleSelectsOnly = (
  products: Keyboard[],
  userPrefs: any,
  questions: any,
) => {
  const singleSelectFilters = ["frame_color"]
  let filteredSet = [...products]
  // console.log(filteredSet)
  Object.keys(userPrefs)
    .filter(preferenceKey => !singleSelectFilters.includes(preferenceKey))
    .forEach(preferenceKey => {
      // console.log(`Filtering by ${preferenceKey}...`)
      const q = questions.find(q => q.key === preferenceKey)
      // console.log(
      //   `Filtering by ${userPrefs[preferenceKey] || "No option chosen"}...`,
      // )
      // console.log("BEFORE", filteredSet)
      filteredSet = filteredSet.filter(
        product => true,
        // q.filterFunction(product, userPrefs[preferenceKey] || null),
      )
      // console.log("AFTER", filteredSet)
    })
  // console.log("FILTERED BY MULTIPLE SELECT", filteredSet)
  return filteredSet
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

  // console.log(prefs && prefs.interfaces)

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
