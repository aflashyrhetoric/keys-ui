/* This is the redux slice for a user's preferences
 * (This is NOT for filtering the products based on those same user's preferences)
 */
import { createSlice } from "@reduxjs/toolkit"
import { arrayOfStringsReducer } from "../helpers"

// A generic reducer for a singleton-esque value

export const preferenceSizeSlice = createSlice({
  name: "preferenceSize",
  initialState: [],
  reducers: arrayOfStringsReducer("PreferenceSize"),
})

export default preferenceSizeSlice.reducer
