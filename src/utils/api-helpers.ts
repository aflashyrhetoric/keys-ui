import { BarcodeLookupSearchResult } from "types/api"
import { postData } from "./api-client"

export const PRODUCT_DATA_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

export const ARRAY_SEPARATOR_MARKER = "~|~"

export const loadProductData = async () =>
  fetch(`${PRODUCT_DATA_ENDPOINT}/fetch_product_data`).then(r => r.json())

export const loadProductDataAdmin = async () =>
  fetch(`${PRODUCT_DATA_ENDPOINT}/fetch_product_data_admin`).then(r => r.json())

export const cacheScrapedProductData = async (runNumber: number) =>
  fetch(`${PRODUCT_DATA_ENDPOINT}/cache_scraped_data/${runNumber}`).then(r =>
    r.json(),
  )

export const cacheVerifiedProductData = async () =>
  fetch(`${PRODUCT_DATA_ENDPOINT}/cache_verified_data`).then(r => r.json())

export const searchProductData = async (
  query: string,
  page: number = 1,
): Promise<any> =>
  postData(`${PRODUCT_DATA_ENDPOINT}/search_products`, { query, page })

export const prepareFormStateForAPI = formState => {
  const f = { ...formState }

  // REMOVE UNNECESSARY TYPES
  delete f._type // remove redis type
  delete f.id // Remove id, we shouldn't set that anyway

  // Join string array types
  Object.keys(f).forEach(key => {
    const value = f[key]
    if (Array.isArray(value)) {
      f[key] = value.join(ARRAY_SEPARATOR_MARKER)
    }
  })

  return f
}

// Given a product from the database,
// parses it into an object that can be used as the formState
export const parseObject = productFromDB => {
  // Join string array types
  Object.keys(productFromDB).forEach(key => {
    const value = productFromDB[key]

    const isValid = value && typeof value === "string"
    const isStringifiedArray = ["features", "interfaces"].includes(key)

    // If the product is valid...
    if (isValid) {

      // ... and is one of our list properties...
      if (isStringifiedArray) {

        // and contains a ~|~, then split
        if (value.includes(ARRAY_SEPARATOR_MARKER)) {
          productFromDB[key] = value.split(ARRAY_SEPARATOR_MARKER)
        } else {
          // otherwise, it's a single array value!
          productFromDB[key] = [value]
        }
      }
    }
  })
  return productFromDB
}

// export const loadNullProductData = async () =>
//   fetch(`${PRODUCT_DATA_ENDPOINT}/fetch_null_product_data`)
//     .then(r => r.json())

// const BARCODE_LOOKUP_API_KEY = process.env.NEXT_PUBLIC_BARCODE_LOOKUP_API_KEY
// const BARCODE_LOOKUP_BASEURL = "https://api.barcodelookup.com/v2/products"
// const paramForSearch = "search"
// const paramForAuth = `key=${BARCODE_LOOKUP_API_KEY}`

// export const searchForProductUPC = async (query: string): Promise<any> => {
//   // Empty queries return empty queries
//   if (query === "") return Promise.resolve([])

//   const q = encodeURIComponent(query)
//   return fetch(
//     `${BARCODE_LOOKUP_BASEURL}/?${paramForSearch}=${q}&${paramForAuth}`,
//   ).then(r => r.json())
// }
