import React from "react"

// Redux stuff
import store from "src/store"
import { Provider } from "react-redux"

import "../styles/globals.scss"

const App: React.FC<any> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
)

export default App
