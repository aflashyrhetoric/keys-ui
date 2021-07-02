/* This is the redux slice for a user's preferences/OS
 */
import { createSlice } from "@reduxjs/toolkit"
import { arrayOfStringsReducer } from "../helpers"

export const preferenceOSSlice = createSlice({
  name: "preferenceOS",
  initialState: [],
  reducers: arrayOfStringsReducer("OS"),
})

export const { addOS, removeOS, toggleOS } = preferenceOSSlice.actions
export default preferenceOSSlice.reducer
