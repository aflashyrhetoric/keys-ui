import { Tag } from "carbon-components-react"
import { UserPreferences } from "types/app"
import { Keyboard } from "types/keyboard"

export const filterProducts = (
  products: Keyboard[],
  userPrefs: any,
  questions: any,
) => {
  let filteredSet = [...products]
  // console.log(filteredSet)
  Object.keys(userPrefs).forEach((preferenceKey) => {
    // console.log(`Filtering by ${preferenceKey}...`)
    const q = questions.find((q) => q.key === preferenceKey)
    // console.log(
    //   `Filtering by ${userPrefs[preferenceKey] || "No option chosen"}...`,
    // )
    // console.log("BEFORE", filteredSet)
    filteredSet = filteredSet.filter((product) =>
      q.filterFunction(product, userPrefs[preferenceKey] || null),
    )
    // console.log("AFTER", filteredSet)
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
    .filter((preferenceKey) => !singleSelectFilters.includes(preferenceKey))
    .forEach((preferenceKey) => {
      console.log(`Filtering by ${preferenceKey}...`)
      const q = questions.find((q) => q.key === preferenceKey)
      // console.log(
      //   `Filtering by ${userPrefs[preferenceKey] || "No option chosen"}...`,
      // )
      console.log("BEFORE", filteredSet)
      filteredSet = filteredSet.filter((product) =>
        q.filterFunction(product, userPrefs[preferenceKey] || null),
      )
      console.log("AFTER", filteredSet)
    })
  console.log("FILTERED BY MULTIPLE SELECT", filteredSet)
  return filteredSet
}

export const userPreferencesToTags = (prefs: UserPreferences): JSX.Element => {
  if (!prefs) {
    return <>No filters</>
  }
  const tags = []
  const sizeTags = prefs.size.map((keyboardSize) => (
    <Tag type="purple">Size: {keyboardSize}</Tag>
  ))

  return (
    <>
      {sizeTags}
      <Tag type="blue">Frame Color: {prefs.frame_color}</Tag>
      <Tag type="teal">LED Backlighting: {prefs.primary_led_color}</Tag>
      <Tag type="magenta">Ports/Interfaces: {prefs.interfaces}</Tag>
    </>
  )
}
