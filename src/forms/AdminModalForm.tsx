import React, { useState } from "react"
import {
  Checkbox,
  Loading,
  MultiSelect,
  TextInput,
} from "carbon-components-react"
import { Keyboard, KeyboardInterfaces } from "types/keyboard"
import { typeToString } from "src/utils/type-helpers"
import { useEffect } from "react"
import { searchProductData } from "src/utils/api-helpers"
import { BarcodeLookupSearchResult } from "types/api"

interface Props {
  formState: Keyboard
  setFormState: Function
}

const AdminModalForm: React.FC<Props> = ({ formState }: Props) => {
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<
    BarcodeLookupSearchResult[]
  >([])

  useEffect(() => {
    setLoading(true)
    // Search for the product and populate the results
    searchProductData(formState.product_name).then(data => {
      setLoading(false)
      setSearchResults(data.products)
    })
  }, [])

  return (
    <>
      {/* <TextInput labelText="Brand" id="Brand" value={formState.brand || ""} /> */}
      {loading && <Loading active />}
      {!loading && (
        <>
          <h2>
            {formState.brand} // {formState.product_name}
          </h2>
          <div style={{ overflow: "scroll", height: "500px" }}>
            {searchResults && searchResults.length > 0 && (
              <ul>
                {searchResults.map(result => {
                  return (
                    <li key={result.barcode_number}>
                      [{result.barcode_number}] {result.product_name}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
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
      )}
    </>
  )
}

export default AdminModalForm
