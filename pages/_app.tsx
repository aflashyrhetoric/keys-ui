import React from "react"

import "../styles/globals.scss"

const App: React.FC<any> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default App
