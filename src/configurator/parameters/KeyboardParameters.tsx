import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Checkbox } from "carbon-components-react"

import {
  Keyboard,
  KeyboardFrameColor,
  KeyboardFrameColors,
  KeyboardInterfaces,
  KeyboardSize,
  KeyboardSizes,
  OperatingSystem,
} from "types/keyboard"
import { togglePrefSize } from "src/store/slices/sizeSlice"
import { togglePrefOS } from "src/store/slices/osSlice"
import { togglePrefInterface } from "src/store/slices/interfaceSlice"
import { togglePrefFrameColor } from "src/store/slices/frameColorSlice"
import { togglePrefBacklighting } from "src/store/slices/keyboardBacklightingSlice"
import { togglePrefSwitch } from "src/store/slices/switchSlice"

import styles from "./parameters.module.scss"
import { UserPreferences } from "types/app"
import { CheckboxEvent } from "types/carbon"
import SidebarSection from "templates/partials/SidebarSection"
import { SwitchTypes } from "types/switch"

interface KeyboardParameters {
  size: any
  compatible_oses: any
  frame_color: string
  interfaces: any
  primary_led_color: string
  // switch_type: string
}

interface Props {
  productsFilteredByMultipleSelect: Keyboard[]
  products: Keyboard[]
  // prefs: UserPreferences
  // setPrefs: Function
}

const KeyboardParameters: React.FC<Props> = ({
  productsFilteredByMultipleSelect,
  products,
}: // setPrefs,
Props) => {
  const preferences = useSelector(state => state)
  console.log(preferences)
  // const { preferences } = state
  const {
    size,
    compatible_oses,
    interfaces,
    frame_color,
    primary_led_color,
    switch_type,
  } = preferences

  const dispatch = useDispatch()

  return (
    <div style={{ padding: "10px" }}>
      <SidebarSection
        showTooltipLeft
        listContent
        label="layout / size"
        tooltipText="Keyboards come in multiple sizes, with larger keyboards offering additional features like a number pad, page up/down buttons, etc."
      >
        {KeyboardSizes.map(keyboardSize => (
          <>
            <Checkbox
              key={`keyboard-size-option-${keyboardSize}`}
              id={`keyboard size option ${keyboardSize}`}
              checked={size?.includes(keyboardSize)}
              className={styles.checkbox}
              labelText={keyboardSize}
              onChange={({ value, id, event }: CheckboxEvent) =>
                dispatch(togglePrefSize(keyboardSize))
              }
            />
          </>
        ))}
      </SidebarSection>

      <SidebarSection
        showTooltipLeft
        listContent
        label="frame color"
        tooltipText="The frame color is the color of the base of the keyboard - the part that touches the desk and houses the internal components."
        style={{ display: "flex", flexFlow: "column wrap", height: "180px" }}
      >
        {KeyboardFrameColors.map(fc => {
          const amountOfProductsForCurrentFrameColor =
            productsFilteredByMultipleSelect.filter(
              k =>
                k.frame_color !== null &&
                k.frame_color.toLowerCase() === frame_color,
            ).length

          // const isEmptySet = amountOfProductsForCurrentFrameColor === 0
          const isEmptySet = false

          return (
            <Checkbox
              key={`${fc}-frame-color`}
              disabled={isEmptySet}
              id={`keyboard color option ${fc}`}
              checked={frame_color === fc && !isEmptySet}
              className={styles.checkbox}
              labelText={`${fc} (${amountOfProductsForCurrentFrameColor})`}
              onChange={({ value, id, event }: CheckboxEvent) =>
                dispatch(togglePrefFrameColor(fc))
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
        {compatible_oses &&
          compatible_oses.length > 0 &&
          [
            OperatingSystem.Windows,
            OperatingSystem.macOS,
            OperatingSystem.Both,
          ].map(os => {
            const isSelected = currentOS => {
              if (currentOS === OperatingSystem.Windows) {
                return (
                  compatible_oses === OperatingSystem.Windows ||
                  compatible_oses === OperatingSystem.Both
                )
              }
              if (currentOS === OperatingSystem.macOS) {
                return (
                  compatible_oses === OperatingSystem.macOS ||
                  compatible_oses === OperatingSystem.Both
                )
              }
              if (currentOS === OperatingSystem.Both) {
                return compatible_oses === OperatingSystem.Both
              }
            }
            return (
              <Checkbox
                key={os}
                id={`keyboard color option ${os}`}
                checked={isSelected(os)}
                className={styles.checkbox}
                labelText={`${os === "both" ? "Both" : os}`}
                onChange={({ value, id, event }: CheckboxEvent) =>
                  dispatch(togglePrefOS(os))
                }
              />
            )
          })}
      </SidebarSection>
      <SidebarSection
        showTooltipLeft
        listContent
        label="Ports & Interfaces"
        tooltipText="Some keyboards are wired-only, others have wireless/bluetooth, some have both."
      >
        {KeyboardInterfaces.map(interfaceType => {
          return (
            <Checkbox
              id={`keyboard interface option ${interfaceType}`}
              key={`${interfaceType}-checkbox`}
              checked={interfaces?.includes(interfaceType)}
              className={styles.checkbox}
              labelText={interfaceType}
              onChange={({ value, id, event }: CheckboxEvent) =>
                dispatch(togglePrefInterface(interfaceType))
              }
            />
          )
        })}
      </SidebarSection>
      <SidebarSection
        showTooltipLeft
        listContent
        label="Available Switch Types"
        tooltipText="Keyboards most often come with switches pre-installed. Switches control the sound and feel of the keypress. Check out our Switches section to learn more."
      >
        {SwitchTypes.map(switchType => {
          return (
            <Checkbox
              id={`keyboard interface option ${switchType}`}
              key={`${switchType}-checkbox`}
              checked={switch_type?.includes(switchType)}
              className={styles.checkbox}
              labelText={switchType}
              onChange={({ value, id, event }: CheckboxEvent) =>
                dispatch(togglePrefSwitch(switchType))
              }
            />
          )
        })}
      </SidebarSection>
    </div>
  )
}

export default KeyboardParameters
