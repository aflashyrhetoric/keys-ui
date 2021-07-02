/* This is the redux slice for a user's preferences/OS
 */
import { createSlice } from "@reduxjs/toolkit"
import { arrayOfStringsReducer } from "../helpers"

export const preferenceSwitchSlice = createSlice({
  name: "preferenceSwitch",
  initialState: [],
  reducers: arrayOfStringsReducer("PrefSwitch"),
})

export const { addPrefSwitch, removePrefSwitch, togglePrefSwitch } =
  preferenceSwitchSlice.actions
export default preferenceSwitchSlice.reducer
