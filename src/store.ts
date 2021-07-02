import { combineReducers, configureStore } from "@reduxjs/toolkit"

import preferencesReducer from "src/store/preferences/reducers"

const reducer = combineReducers({
  preferences: preferencesReducer,
})

export default configureStore({
  reducer,

  // productData: {},
  // filteredProducts: {},
})
