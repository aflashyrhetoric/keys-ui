import React, { useState, createContext, useContext } from "react"
import useLocalStorage from "src/utils/local-storage"

import { Keyboard, KeyboardSize } from "types/keyboard"
import "../styles/globals.scss"

const initialPreferences: any = {
  size: KeyboardSize.TKL,
}

const updatePreferences: React.Dispatch<any> = () => {}

const PreferencesContext = createContext({
  prefs: initialPreferences,
  updatePreferences,
})

// export const PreferencesConsumer = ({ children }) => {
//   // const ctxVal: any = useLocalStorage("preferences", initialPreferences)
//   return (
//     <PreferencesContext.Consumer>
//       {(value) => ({ children })}
//     </PreferencesContext.Consumer>
//   )
// }

// Import and set a `value` equal to the result of the below function call to grab the context's value - the current prefs object blob
export const usePreferences = () => useContext(PreferencesContext)

const App: React.FC<any> = ({ Component, pageProps }) => {
  const [prefs, updatePreferences] = useState(initialPreferences)

  // Create the provider
  const PreferencesProvider = ({ children }) => {
    // const ctxVal: any = useLocalStorage("preferences", initialPreferences)
    return (
      <PreferencesContext.Provider value={{ prefs, updatePreferences }}>
        {children}
      </PreferencesContext.Provider>
    )
  }

  return (
    <PreferencesProvider>
      <Component {...pageProps} />
    </PreferencesProvider>
  )
}

export default App
