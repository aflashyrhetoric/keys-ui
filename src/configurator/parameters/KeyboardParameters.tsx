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
import { togglePreferenceSize } from "src/store/slices/sizeSlice"

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
  const prefs = useSelector(state => state.preferences)
  console.log(prefs)
  const dispatch = useDispatch()

  return (
    <div style={{ padding: "10px" }}>
      <SidebarSection
        showTooltipLeft
        listContent
        label="layout / size"
        tooltipText="Keyboards come in multiple sizes, with larger keyboards offering additional features like a number pad, page up/down buttons, etc."
      >
        {KeyboardSizes.map(size => (
          <Checkbox
            key={`keyboard-size-option-${size}`}
            id={`keyboard size option ${size}`}
            checked={prefs && prefs.size ? prefs.size.includes(size) : false}
            className={styles.checkbox}
            labelText={size}
            onChange={({ value, id, event }: CheckboxEvent) =>
              // togglePresenceInArray("size", prefs.size, size)
              dispatch(toggleSize())
            }
          />
        ))}
      </SidebarSection>

      <SidebarSection
        showTooltipLeft
        listContent
        label="frame color"
        tooltipText="The frame color is the color of the base of the keyboard - the part that touches the desk and houses the internal components."
        style={{ display: "flex", flexFlow: "column wrap", height: "180px" }}
      >
        {KeyboardFrameColors.map(frame_color => {
          const amountOfProductsForCurrentFrameColor =
            productsFilteredByMultipleSelect.filter(
              k =>
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
          ].map(os => {
            const isSelected = currentOS => {
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
      <SidebarSection
        showTooltipLeft
        listContent
        label="Ports & Interfaces"
        tooltipText="Some keyboards are wired-only, others have wireless/bluetooth, some have both."
      >
        {prefs &&
          KeyboardInterfaces.map(interfaceType => {
            return (
              <Checkbox
                id={`keyboard interface option ${interfaceType}`}
                key={`${interfaceType}-checkbox`}
                checked={prefs?.interfaces?.includes(interfaceType)}
                className={styles.checkbox}
                labelText={interfaceType}
                onChange={({ value, id, event }: CheckboxEvent) =>
                  togglePresenceInArray(
                    "interfaces",
                    prefs.interfaces,
                    interfaceType,
                  )
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
        {prefs &&
          SwitchTypes.map(switchType => {
            return (
              <Checkbox
                id={`keyboard interface option ${switchType}`}
                key={`${switchType}-checkbox`}
                checked={prefs?.switch_type?.includes(switchType)}
                className={styles.checkbox}
                labelText={switchType}
                onChange={({ value, id, event }: CheckboxEvent) =>
                  togglePresenceInArray(
                    "switch_type",
                    prefs.switch_type,
                    switchType,
                  )
                }
              />
            )
          })}
      </SidebarSection>
    </div>
  )
}

export default KeyboardParameters
