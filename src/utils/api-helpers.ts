import { BarcodeLookupSearchResult } from "types/api"
import { postData } from "./api-client"

const PRODUCT_DATA_ENDPOINT = "http://localhost:3210"

export const loadProductData = async () =>
  fetch(`${PRODUCT_DATA_ENDPOINT}/fetch_product_data`).then(r => r.json())

export const searchProductData = async (query: string): Promise<any> =>
  postData(`${PRODUCT_DATA_ENDPOINT}/search_products`, { query })

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
