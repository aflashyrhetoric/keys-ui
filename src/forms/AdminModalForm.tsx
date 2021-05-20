import React, { useState } from "react"
import {
  Button,
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

  const searchData = (term: string) => {
    setLoading(true)
    // Search for the product and populate the results
    searchProductData(term).then(data => {
      setLoading(false)
      setSearchResults(data.products)
    })
  }

  return (
    <>
      {/* <TextInput labelText="Brand" id="Brand" value={formState.brand || ""} /> */}
      {loading && <Loading active />}
      {!loading && (
        <>
          <h2>
            {formState.brand} // {formState.product_name}
          </h2>
          <Button
            kind="secondary"
            size="sm"
            onClick={() => searchData(formState.product_name)}
          >
            Search with Product Name
          </Button>
          <Button
            kind="secondary"
            size="sm"
            onClick={() =>
              searchData(`${formState.brand} ${formState.product_name}`)
            }
          >
            Search with Brand + Product Name
          </Button>
          <div style={{ overflow: "scroll", minHeight: "100px" }}>
            {searchResults && searchResults.length > 0 && (
              <ul>
                {searchResults.map(result => {
                  return (
                    <li
                      key={result.barcode_number}
                      style={{ marginBottom: "8px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        {result.barcode_number}
                      </span>{" "}
                      {result.product_name}
                      <Button
                        kind="primary"
                        size="sm"
                        onClick={() => alert(`Set ${result.barcode_number}`)}
                      >
                        Set as UPC
                      </Button>
                      {result.stores && (
                        <a href={result.stores[0].product_url} target="_blank">
                          URL
                        </a>
                      )}
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
