import React, { useState } from "react"
import { Checkbox } from "carbon-components-react"
import {
  Keyboard,
  KeyboardFrameColor,
  KeyboardFrameColors,
  KeyboardSize,
  KeyboardSizes,
  OperatingSystem,
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
  productsFilteredByMultipleSelect: Keyboard[]
  products: Keyboard[]
  prefs: UserPreferences
  setPrefs: Function
}

const KeyboardParameters: React.FC<Props> = ({
  productsFilteredByMultipleSelect,
  products,
  prefs,
  setPrefs,
}: Props) => {
  const updateSize = (size: KeyboardSize[]) => setPrefs({ ...prefs, size })
  const updateColor = (frame_color: KeyboardFrameColor) =>
    setPrefs({ ...prefs, frame_color })
  const updateOS = (compatible_oses: OperatingSystem) =>
    setPrefs({ ...prefs, compatible_oses })

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
        showTooltipLeft
        listContent
        label="layout / size"
        tooltipText="Keyboards come in multiple sizes, with larger keyboards offering additional features like a number pad, page up/down buttons, etc."
      >
        {KeyboardSizes.map((size) => (
          <Checkbox
            key={`keyboard-size-option-${size}`}
            id={`keyboard size option ${size}`}
            checked={prefs && prefs.size ? prefs.size.includes(size) : false}
            className={styles.checkbox}
            labelText={size}
            onChange={({ value, id, event }: CheckboxEvent) =>
              togglePresenceInArray(prefs.size, size)
            }
          />
        ))}
      </SidebarSection>

      <SidebarSection
        showTooltipLeft
        listContent
        label="frame color"
        tooltipText="The frame color is the color of the base of the keyboard - the part that touches the desk and houses the internal components."
      >
        {KeyboardFrameColors.map((frame_color) => {
          const amountOfProductsForCurrentFrameColor = productsFilteredByMultipleSelect.filter(
            (k) =>
              k.frame_color !== null &&
              k.frame_color.toLowerCase() === frame_color,
          ).length

          const isEmptySet = amountOfProductsForCurrentFrameColor === 0

          return (
            <Checkbox
              key={`${frame_color}-frame-color`}
              disabled={isEmptySet}
              id={`keyboard color option ${frame_color}`}
              checked={
                prefs && prefs.frame_color === frame_color && !isEmptySet
              }
              className={styles.checkbox}
              labelText={`${frame_color} (${amountOfProductsForCurrentFrameColor})`}
              onChange={({ value, id, event }: CheckboxEvent) =>
                updateColor(frame_color)
              }
            />
          )
        })}
      </SidebarSection>
      <SidebarSection
        showTooltipLeft
        listContent
        label="Operating System"
        tooltipText="Some keyboards are Windows-only or Mac-only. Some support both. Select all that you need."
      >
        {prefs &&
          [
            OperatingSystem.Windows,
            OperatingSystem.macOS,
            OperatingSystem.Both,
          ].map((os) => {
            const isSelected = (currentOS) => {
              if (currentOS === OperatingSystem.Windows) {
                return (
                  prefs.compatible_oses === OperatingSystem.Windows ||
                  prefs.compatible_oses === OperatingSystem.Both
                )
              }
              if (currentOS === OperatingSystem.macOS) {
                return (
                  prefs.compatible_oses === OperatingSystem.macOS ||
                  prefs.compatible_oses === OperatingSystem.Both
                )
              }
              if (currentOS === OperatingSystem.Both) {
                return prefs.compatible_oses === OperatingSystem.Both
              }
            }
            return (
              <Checkbox
                key={os}
                id={`keyboard color option ${os}`}
                checked={isSelected(os)}
                className={styles.checkbox}
                labelText={`${os === "both" ? "Both" : os}`}
                onChange={({ value, id, event }: CheckboxEvent) => updateOS(os)}
              />
            )
          })}
      </SidebarSection>
    </div>
  )
}

export default KeyboardParameters
