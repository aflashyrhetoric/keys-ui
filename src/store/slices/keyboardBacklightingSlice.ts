/* This is the redux slice for a user's preferences/OS
 */
import { createSlice } from "@reduxjs/toolkit"
import { singletonReducer } from "../helpers"

export const preferenceKeyboardBacklightingSlice = createSlice({
  name: "preferenceKeyboardBacklighting",
  initialState: [],
  reducers: singletonReducer("PrefBacklighting"),
})

export const {
  addPrefBacklighting,
  removePrefBacklighting,
  togglePrefBacklighting,
} = preferenceKeyboardBacklightingSlice.actions
export default preferenceKeyboardBacklightingSlice.reducer
