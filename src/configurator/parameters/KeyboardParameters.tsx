import React, { useState } from "react"
import { Checkbox } from "carbon-components-react"
import {
  KeyboardFrameColor,
  KeyboardFrameColors,
  KeyboardSize,
  KeyboardSizes,
} from "types/keyboard"

import styles from "./parameters.module.scss"
import { UserPreferences } from "types/app"
import { CheckboxEvent } from "types/carbon"
import SidebarSection from "templates/partials/SidebarSection"

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
  const updateSize = (size: KeyboardSize[]) => setPrefs({ ...prefs, size })
  const updateColor = (frame_color: KeyboardFrameColor) =>
    setPrefs({ ...prefs, frame_color })

  const togglePresenceInArray = (list: any[], item) => {
    const updatedList = [...list]
    if (list.includes(item)) {
      const indexOfExistingSize = list.findIndex((s) => s === item)
      updatedList.splice(indexOfExistingSize, 1)
      updateSize(updatedList)
    } else {
      updateSize([...updatedList, item])
    }
  }

  return (
    <div style={{ padding: "10px" }}>
      <SidebarSection
        listContent
        label="layout / size"
        tooltipText="Keyboards come in multiple sizes, with larger keyboards offering additional features like a number pad, page up/down buttons, etc."
      >
        {KeyboardSizes.map((size) => (
          <Checkbox
            id={`keyboard size option ${size}`}
            checked={prefs ? prefs.size.includes(size) : false}
            className={styles.checkbox}
            labelText={size}
            onChange={({ value, id, event }: CheckboxEvent) =>
              togglePresenceInArray(prefs.size, size)
            }
          />
        ))}
      </SidebarSection>

      <SidebarSection
        listContent
        label="frame color"
        tooltipText="The frame color is the color of the base of the keyboard - the part that touches the desk and houses the internal components."
      >
        {KeyboardFrameColors.map((frame_color) => {
          return (
            <Checkbox
              id={`keyboard color option ${frame_color}`}
              checked={prefs && prefs.frame_color === frame_color}
              className={styles.checkbox}
              labelText={frame_color}
              onChange={({ value, id, event }: CheckboxEvent) =>
                updateColor(frame_color)
              }
            />
          )
        })}
      </SidebarSection>
    </div>
  )
}

export default KeyboardParameters
