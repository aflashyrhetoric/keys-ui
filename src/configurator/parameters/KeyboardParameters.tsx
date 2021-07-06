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
import { setPrefOS } from "src/store/slices/osSlice"
import { togglePrefInterface } from "src/store/slices/interfaceSlice"
import { setPrefFrameColor } from "src/store/slices/frameColorSlice"
import { togglePrefBacklighting } from "src/store/slices/keyboardBacklightingSlice"
import { togglePrefSwitch } from "src/store/slices/switchSlice"

import styles from "./parameters.module.scss"
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

const KeyboardParameters: React.FC = () => {
  const preferences = useSelector(state => state.preferences)
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
        key="size-section"
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
        key="frame-color-section"
        showTooltipLeft
        listContent
        label="frame color"
        tooltipText="The frame color is the color of the base of the keyboard - the part that touches the desk and houses the internal components."
        style={{ display: "flex", flexFlow: "column wrap", height: "180px" }}
      >
        {KeyboardFrameColors.map(fc => {
          // TODO
          const amountOfProductsForCurrentFrameColor = ""
          const isEmptySet = false

          // const amountOfProductsForCurrentFrameColor =
          //   productsFilteredByMultipleSelect.filter(
          //     k =>
          //       k.frame_color !== null &&
          //       k.frame_color.toLowerCase() === frame_color,
          //   ).length

          // const isEmptySet = amountOfProductsForCurrentFrameColor === 0

          return (
            <Checkbox
              key={`${fc}-frame-color`}
              disabled={isEmptySet}
              id={`keyboard color option ${fc}`}
              checked={frame_color === fc && !isEmptySet}
              className={styles.checkbox}
              // labelText={`${fc} (${amountOfProductsForCurrentFrameColor})`}
              labelText={fc}
              onChange={({ value, id, event }: CheckboxEvent) =>
                dispatch(setPrefFrameColor(fc))
              }
            />
          )
        })}
      </SidebarSection>
      <SidebarSection
        key="os-section"
        showTooltipLeft
        listContent
        label="Operating System"
        tooltipText="Some keyboards are Windows-only or Mac-only. Some support both. Select all that you need."
      >
        {[
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
              onChange={({ value, id, event }: CheckboxEvent) => {
                dispatch(setPrefOS(os))
              }}
            />
          )
        })}
      </SidebarSection>
      <SidebarSection
        key="ports-section"
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
        key="switch-section"
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
