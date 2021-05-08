import React, { useState } from "react"
import { Checkbox } from "carbon-components-react"
import usePreferencesStore, { localStorageKey } from "src/utils/local-storage"
import { KeyboardSize, KeyboardSizes } from "types/keyboard"

import styles from "./parameters.module.scss"
import { UserPreferences } from "types/app"
import { CheckboxEvent } from "types/carbon"

interface KeyboardParameters {
  frame_color: string
  compatible_oses: any
  interfaces: any
  primary_led_color: string

  size: any
}

interface Props {
  prefs: UserPreferences
  setPrefs: Function
}

const KeyboardParameters: React.FC<Props> = ({ prefs, setPrefs }: Props) => {
  const updateSize = (size: KeyboardSize[]) => {
    setPrefs({ ...prefs, size })
  }

  return (
    <div style={{ width: "140px", wordBreak: "break-word" }}>
      {KeyboardSizes.map((size) => (
        <Checkbox
          checked={prefs ? prefs.size.includes(size) : false}
          className={styles.checkbox}
          id={size}
          labelText={size}
          onChange={({ value, id, event }: CheckboxEvent) => {
            console.log(size)
            const currentSizes = [...prefs.size]
            // If includes, remove
            if (prefs.size.includes(size)) {
              const indexOfExistingSize = prefs.size.findIndex(
                (s) => s === size,
              )
              currentSizes.splice(indexOfExistingSize, 1)
              updateSize(currentSizes)
            } else {
              updateSize([...currentSizes, size])
            }
          }}
        />
      ))}
    </div>
  )
}

export default KeyboardParameters
