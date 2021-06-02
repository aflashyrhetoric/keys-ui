import React, { useState } from "react"
import { RadioButtonGroup, RadioButton } from "carbon-components-react"

interface SelectItemProps {
  id: string
  checked: boolean
  labelText: string
  value: any
}

interface Props {
  name: string
  legendText: string
  orientation?: string
  value: any
  onChange: Function

  enableColorAnnotations: boolean
  items: any
}

const BaseRadioButtonGroup: React.FC<Props> = ({
  name,
  orientation = "vertical",
  value,
  onChange,
  legendText = "",
  enableColorAnnotations = false,
  items,
}: Props) => {
  // const [something, setSomething] = useState(props.something);

  return (
    <RadioButtonGroup
      name="frame-color-selector"
      orientation={orientation}
      value={value}
      onChange={onChange}
      legendText={legendText}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          height: "175px",
        }}
      >
        {items.map(item => {
          return (
            <div
              key={`item-${item}`}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "space-between",
                paddingRight: "70px",
                paddingBottom: "8px",
                width: "25%",
              }}
            >
              <RadioButton
                key={item}
                id={item}
                checked={value === item}
                labelText={item}
                value={item}
              />
              <div
                style={{
                  height: "50px",
                  width: "50px",
                  background: enableColorAnnotations ? item : "",
                  borderRadius: "5px",
                }}
              />
            </div>
          )
        })}
      </div>
    </RadioButtonGroup>
  )
}

export default BaseRadioButtonGroup
