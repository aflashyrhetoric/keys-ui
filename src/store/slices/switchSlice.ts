/* This is the redux slice for a user's preferences/OS
 */
import { createSlice } from "@reduxjs/toolkit"
import { arrayOfStringsReducer } from "../helpers"

export const preferenceSwitchSlice = createSlice({
  name: "preferenceSwitch",
  initialState: [],
  reducers: arrayOfStringsReducer("Switch"),
})

export const { addSwitch, removeSwitch, toggleSwitch } =
  preferenceSwitchSlice.actions
export default preferenceSwitchSlice.reducer
