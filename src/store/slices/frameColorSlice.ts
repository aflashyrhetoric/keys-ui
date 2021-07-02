/* This is the redux slice for a user preferences/frame_color
 */
import { createSlice } from "@reduxjs/toolkit"
import { singletonReducer } from "../helpers"

export const preferenceFrameColorSlice = createSlice({
  name: "preferenceFrameColor",
  initialState: null,
  reducers: singletonReducer("PrefFrameColor"),
})

export const { setPrefFrameColor } = preferenceFrameColorSlice.actions
export default preferenceFrameColorSlice.reducer
