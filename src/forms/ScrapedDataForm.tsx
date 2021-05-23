import React, { useState } from "react"
import {
  Button,
  Checkbox,
  Loading,
  MultiSelect,
  TextInput,
} from "carbon-components-react"
import { Launch20 } from "@carbon/icons-react"
import { Keyboard, KeyboardInterfaces } from "types/keyboard"
import { typeToString } from "src/utils/type-helpers"
import { searchProductData } from "src/utils/api-helpers"
import { BarcodeLookupSearchResult } from "types/api"
import { linkToGoogleSearch, linkToGoogleSearchUPC } from "src/utils/misc"

interface Props {
  formState: Keyboard
  setFormState: Function
}

const ScrapedDataForm: React.FC<Props> = ({
  formState,
  setFormState,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<
    BarcodeLookupSearchResult[]
  >([])

  const [namePage, setNamePage] = useState(1)
  const [nameBrandPage, setNameBrandPage] = useState(1)

  const searchData = (term: string, page) => {
    setLoading(true)
    // Search for the product and populate the results
    searchProductData(term, page).then(data => {
      setLoading(false)
      setSearchResults(data.products)
    })
  }

  return (
    <>
      {/* <TextInput labelText="Brand" id="Brand" value={formState.brand || ""} /> */}
      {loading && <Loading active />}
      {!loading && formState && (
        <>
          <h4>{formState.full_title}</h4>
          <hr />
          <div style={{ marginBottom: "10px" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                size="sm"
                kind="tertiary"
                target="_blank"
                href={linkToGoogleSearch(formState.full_title)}
                renderIcon={Launch20}
              >
                Google
              </Button>
              <Button
                size="sm"
                kind="tertiary"
                target="_blank"
                href={linkToGoogleSearchUPC(formState.full_title)}
                renderIcon={Launch20}
              >
                Google UPC
              </Button>
              <Button
                size="sm"
                kind="tertiary"
                href={formState.url}
                target="_blank"
                renderIcon={Launch20}
              >
                MK.com
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  marginRight: "10px",
                }}
              >
                Search by:
              </span>
              <Button
                kind="tertiary"
                size="sm"
                onClick={() => {
                  searchData(formState.product_name, namePage)
                  setNamePage(namePage + 1)
                }}
              >
                Name ({namePage})
              </Button>
              <Button
                kind="tertiary"
                size="sm"
                onClick={() => {
                  searchData(
                    `${formState.brand} ${formState.product_name}`,
                    nameBrandPage,
                  )
                  setNameBrandPage(nameBrandPage + 1)
                }}
              >
                Brand + Name ({nameBrandPage})
              </Button>
            </div>
          </div>
          <div style={{ marginBottom: "10px" }} />
          <div style={{ overflow: "scroll", minHeight: "100px" }}>
            {searchResults && searchResults.length > 0 && (
              <ul>
                {!searchResults ||
                  (searchResults.length === 0 && (
                    <p style={{ opacity: 0.4, fontStyle: "italic" }}>
                      (No results)
                    </p>
                  ))}
                {searchResults.map(result => {
                  return (
                    <li
                      key={result.barcode_number}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        padding: "8px",
                      }}
                    >
                      <span style={{ width: "80%" }}>
                        <span style={{ fontWeight: "bold" }}>
                          {result.barcode_number}
                        </span>{" "}
                        {result.product_name}
                      </span>
                      <span
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          kind="primary"
                          size="sm"
                          onClick={() => {
                            setFormState({
                              ...formState,
                              upc: result.barcode_number,
                            })
                          }}
                        >
                          Set as UPC
                        </Button>
                        {result.stores && (
                          <Button
                            size="sm"
                            kind={
                              result &&
                              result.stores &&
                              result.stores[0] &&
                              result.stores[0].product_url
                                ? "secondary"
                                : "tertiary"
                            }
                            href={
                              (result &&
                                result.stores &&
                                result.stores[0] &&
                                result.stores[0].product_url) ||
                              linkToGoogleSearch(result.product_name)
                            }
                            target="_blank"
                            style={{ maxWidth: "30px" }}
                          >
                            {result &&
                            result.stores &&
                            result.stores[0] &&
                            result.stores[0].product_url
                              ? `Product URL`
                              : `Google Search`}
                          </Button>
                        )}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          {formState && formState.interfaces !== undefined && (
            <MultiSelect
              id="interfaces-multiselect"
              label="Interfaces"
              items={KeyboardInterfaces.map(typeToString)}
              itemToString={(i: string) => i}
              initialSelectedItems={
                formState.interfaces?.map(typeToString) || []
              }
              onChange={e =>
                setFormState({ ...formState, interfaces: e.selectedItems })
              }
            />
          )}
          <TextInput
            labelText="UPC"
            id="Product-UPC"
            value={formState.upc || ""}
            onChange={e => setFormState({ ...formState, upc: e.target.value })}
          />
          <TextInput
            labelText="Dimensions"
            id="Dimensions"
            value={formState.dimensions || ""}
            onChange={e =>
              setFormState({ ...formState, dimensions: e.target.value })
            }
          />
          <TextInput
            labelText="Frame Color"
            id="Frame Color"
            value={formState.frame_color || ""}
            onChange={e =>
              setFormState({ ...formState, frame_color: e.target.value })
            }
          />
          <TextInput
            labelText="Primary LED Color"
            id="Primary LED Color"
            value={formState.primary_led_color || ""}
            onChange={e =>
              setFormState({ ...formState, primary_led_color: e.target.value })
            }
          />
          <TextInput
            labelText="Weight"
            id="Weight"
            value={formState.weight || ""}
            onChange={e =>
              setFormState({ ...formState, weight: e.target.value })
            }
          />
          <Checkbox
            labelText="Windows Compatible"
            id="Windows Compatible"
            checked={formState.windows_compatible === "yes"}
            onChange={() =>
              setFormState({
                ...formState,
                windows_compatible:
                  formState.windows_compatible === "yes" ? "no" : "yes",
              })
            }
          />
          <Checkbox
            labelText="Mac Compatible"
            id="Mac Compatible"
            checked={formState.mac_compatible === "yes"}
            onChange={() =>
              setFormState({
                ...formState,
                mac_compatible:
                  formState.mac_compatible === "yes" ? "no" : "yes",
              })
            }
          />
          <Checkbox
            labelText="Linux Compatible"
            id="Linux Compatible"
            checked={formState.linux_compatible === "yes"}
            onChange={() =>
              setFormState({
                ...formState,
                linux_compatible:
                  formState.linux_compatible === "yes" ? "no" : "yes",
              })
            }
          />
        </>
      )}
    </>
  )
}

export default ScrapedDataForm
