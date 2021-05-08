import { Keyboard } from "types/keyboard"

export const filterProducts = (
  products: Keyboard[],
  userPrefs: any,
  questions: any,
) => {
  let filteredSet = [...products]
  // console.log(filteredSet)
  Object.keys(userPrefs).forEach((preferenceKey) => {
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
  return filteredSet
}
