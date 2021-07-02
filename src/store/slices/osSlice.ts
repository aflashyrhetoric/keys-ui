/* This is the redux slice for a user's preferences/OS
 */
import { createSlice } from "@reduxjs/toolkit"
import { singletonReducer } from "../helpers"

export const preferenceOSSlice = createSlice({
  name: "preferenceOS",
  initialState: null,
  reducers: singletonReducer("PrefOS"),
})

export const { setPrefOS } = preferenceOSSlice.actions
export default preferenceOSSlice.reducer
