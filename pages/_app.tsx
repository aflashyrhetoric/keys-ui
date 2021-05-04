import React, { createContext, useContext } from "react"
import { useLocalStorage } from "@rehooks/local-storage"

import { Keyboard, KeyboardSize } from "types/keyboard"
import "../styles/globals.scss"

const defaultPreferences = {
  size: KeyboardSize.TKL,
}
const defaultContextValue = [defaultPreferences as Keyboard, () => {}, () => {}]
const PreferencesContext = createContext(defaultContextValue)

export const PreferencesProvider = ({ children }) => {
  const ctxVal: any = useLocalStorage("preferences", defaultPreferences)
  return (
    <PreferencesContext.Provider value={ctxVal}>
      {children}
    </PreferencesContext.Provider>
  )
}

export const usePreferences = () => useContext(PreferencesContext)

const App: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <PreferencesProvider>
      <Component {...pageProps} />
    </PreferencesProvider>
  )
}

export default App
