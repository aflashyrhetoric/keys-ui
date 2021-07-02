import { combineReducers, configureStore } from "@reduxjs/toolkit"

// import sizeReducer from "src/store/slices/sizeSlice"
// import OSReducer from "src/store/slices/osSlice"
// import interfaceReducer from "src/store/slices/interfaceSlice"
// import frameColorReducer from "src/store/slices/frameColorSlice"
// import keyboardBacklightingReducer from "src/store/slices/keyboardBacklightingSlice"
// import switchReducer from "src/store/slices/switchSlice"
import preferencesReducer from "src/store/preferences/reducers"
import { UserPreferences } from "types/app"

const rootPreferencesReducer = combineReducers({
  preferences: preferencesReducer,
})

export default configureStore({
  reducer: {
    preferences: rootPreferencesReducer,
  },
})
