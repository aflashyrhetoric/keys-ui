import produce from "immer"

// Removes existing items, adds missing items from `list`
export const toggleInArray = (list: any[], item) => {
  const newList = produce(list, updatedList => {
    if (updatedList.includes(item)) {
      const indexOfExistingSize = list.findIndex(s => s === item)
      updatedList.splice(indexOfExistingSize, 1)
    } else {
      updatedList.push(item)
      // setPrefs({ ...prefs, [key]: [...updatedList, item] })
    }
  })
  return newList
}
