import { configureStore } from "@reduxjs/toolkit"
import { preferencesReducer } from "store/slices/preferencesReducer"

// const rootPreferencesReducer = combineReducers({
//   size: arrayOfStringsReducer(),
//   compatible_oses: arrayOfStringsReducer(),
//   interfaces: arrayOfStringsReducer(),
//   frame_color: singletonReducer(),
//   primary_led_color: singletonReducer(),
//   switch_type: arrayOfStringsReducer(),
// })

// console.log(rootPreferencesReducer)

export default configureStore({
  reducer: {
    preferences: preferencesReducer,
  },
})
