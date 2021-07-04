/* This is the redux slice for a user's preferences/size
 * (This is NOT for filtering the products based on those same user's preferences)
 */
import { createSlice } from "@reduxjs/toolkit"
import { arrayOfStringsReducer } from "../helpers"

export const preferenceSizeSlice = createSlice({
  name: "preferenceSize",
  initialState: [],
  reducers: arrayOfStringsReducer("PrefSize"),
})

export const { addPrefSize, removePrefSize, togglePrefSize, setPrefSize } =
  preferenceSizeSlice.actions
export default preferenceSizeSlice.reducer
