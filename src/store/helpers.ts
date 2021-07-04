import { toggleInArray } from "src/utils/general"

// A generic reducer for an array of strings
export const arrayOfStringsReducer = (item: string) => ({
  [`add${item}`]: (state: any, action: any) => {
    state.push(action.payload)
    return state
  },
  [`remove${item}`]: (state: any, action: any) => {
    const indexOfExistingSize = state.findIndex(s => s === action.payload)
    state.splice(indexOfExistingSize, 1)
    return state
  },
  [`set${item}`]: (state: any, action: any) => action.payload,
  [`toggle${item}`]: (state: any, action: any) =>
    toggleInArray(state, action.payload),
})

export const singletonReducer = (item: string) => ({
  [`set${item}`]: (state, action) => {
    return action.payload
  },
})
