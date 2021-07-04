import { combineReducers } from "@reduxjs/toolkit"

import sizeReducer from "src/store/slices/sizeSlice"
import OSReducer from "src/store/slices/osSlice"
import interfaceReducer from "src/store/slices/interfaceSlice"
import frameColorReducer from "src/store/slices/frameColorSlice"
import keyboardBacklightingReducer from "src/store/slices/keyboardBacklightingSlice"
import switchReducer from "src/store/slices/switchSlice"

const rootPreferencesReducer = combineReducers({
  size: sizeReducer,
  compatible_oses: OSReducer,
  interfaces: interfaceReducer,
  frame_color: frameColorReducer,
  primary_led_color: keyboardBacklightingReducer,
  switch_type: switchReducer,
})

export default rootPreferencesReducer
