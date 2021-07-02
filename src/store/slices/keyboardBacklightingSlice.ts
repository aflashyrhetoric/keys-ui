/* This is the redux slice for a user's preferences/OS
 */
import { createSlice } from "@reduxjs/toolkit"
import { singletonReducer } from "../helpers"

export const preferenceKeyboardBacklightingSlice = createSlice({
  name: "preferenceKeyboardBacklighting",
  initialState: [],
  reducers: singletonReducer("KeyboardBacklighting"),
})

export const {
  addKeyboardBacklighting,
  removeKeyboardBacklighting,
  toggleKeyboardBacklighting,
} = preferenceKeyboardBacklightingSlice.actions
export default preferenceKeyboardBacklightingSlice.reducer
