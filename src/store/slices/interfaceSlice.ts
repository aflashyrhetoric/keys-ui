/* This is the redux slice for a user's preferences/interfaces
 */
import { createSlice } from "@reduxjs/toolkit"
import { arrayOfStringsReducer } from "../helpers"

export const preferenceInterfaceSlice = createSlice({
  name: "preferenceInterface",
  initialState: [],
  reducers: arrayOfStringsReducer("PrefInterface"),
})

export const { addPrefInterface, removePrefInterface, togglePrefInterface } =
  preferenceInterfaceSlice.actions
export default preferenceInterfaceSlice.reducer
