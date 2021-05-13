import React, { useState } from "react"
import { Checkbox, MultiSelect, TextInput } from "carbon-components-react"
import { Keyboard, KeyboardInterfaces } from "types/keyboard"
import { typeToString } from "src/utils/type-helpers"

interface Props {
  formState: Keyboard
  setFormState: Function
}

const AdminModalForm: React.FC<Props> = ({ formState }: Props) => {
  return (
    <>
      {/* <TextInput labelText="Brand" id="Brand" value={formState.brand || ""} /> */}
      <h2>
        {formState.brand} // {formState.product_name}
      </h2>
      {/* <p>{formState.full_title || ""}</p> */}
      <MultiSelect
        id="interfaces-multiselect"
        label="Interfaces"
        items={KeyboardInterfaces.map(typeToString)}
        itemToString={(i: any) => i}
        initialSelectedItems={formState.interfaces?.map(typeToString) || []}
        onChange={e => console.log(e)}
      />
      <TextInput
        labelText="Dimensions"
        id="Dimensions"
        value={formState.dimensions || ""}
      />
      <TextInput
        labelText="Frame Color"
        id="Frame Color"
        value={formState.frame_color || ""}
      />
      <TextInput
        labelText="Primary LED Color"
        id="Primary LED Color"
        value={formState.primary_led_color || ""}
      />
      <TextInput
        labelText="Weight"
        id="Weight"
        value={formState.weight || ""}
      />
      <Checkbox
        labelText="Windows Compatible"
        id="Windows Compatible"
        checked={formState.windows_compatible === "yes"}
      />
      <Checkbox
        labelText="Mac Compatible"
        id="Mac Compatible"
        checked={formState.mac_compatible === "yes"}
      />
      <Checkbox
        labelText="Linux Compatible"
        id="Linux Compatible"
        checked={formState.linux_compatible === "yes"}
      />
    </>
  )
}

export default AdminModalForm
