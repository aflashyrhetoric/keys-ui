export interface BarcodeLookupStore {
  store_name: string // "Totally Furniture"
  store_price: string // "274.29"
  product_url: string // "https://rd.bizrate.com/rd?t=https://www.totallyfurniture.com/navigate-lounge-chair-in-brown-east-end-imports-eei-2145-brn?utm_source=conn&utm_medium=cpc&mid=64886&cat_id=13170101&a"
  currency_code: string //"USD"
  currency_symbol: string //"$"
}
export interface BarcodeLookupSearchResult {
  barcode_number: string
  barcode_type: string
  barcode_formats: string
  mpn: string
  model: string
  asin: string
  product_name: string
  title: string
  category: string
  manufacturer: string
  brand: string
  label: string
  author: string
  publisher: string
  artist: string
  actor: string
  director: string
  studio: string
  genre: string
  audience_rating: string
  ingredients: string
  nutrition_facts: string
  color: string
  format: string
  package_quantity: string
  size: string
  length: string
  width: string
  height: string
  weight: string
  release_date: string
  description: string
  features: string
  images: string
  stores: BarcodeLookupStore[]
}

//   barcode_number: "889654041047"
//   barcode_type: "UPC"
//   barcode_formats: "UPC 889654041047, EAN 0889654041047"
//   mpn: "EEI2145BRN"
//   model: ""
//   asin: ""
//   product_name: "Navigate Lounge Chair in Brown - East End Imports EEI-2145-BRN"
//   title: ""
//   category: "Electronics > GPS Navigation Systems"
//   manufacturer: "Modway"
//   brand: "East End Imports"
//   label: ""
//   author: ""
//   publisher: ""
//   artist: ""
//   actor: ""
//   director: ""
//   studio: ""
//   genre: ""
//   audience_rating: ""
//   ingredients: ""
//   nutrition_facts: ""
//   color: ""
//   format: ""
//   package_quantity: ""
//   size: "Chair"
//   length: "26.00"
//   width: "26.00"
//   height: "49.00"
//   weight: "58.00"
//   release_date: ""
//   description: "Navigate Lounge Chair in Brown - East End Imports EEI-2145-BRN Sail forth with the elegant Navigate Lounge Chair. Crafted with an exquisite scroll-back design and deep tufted buttons, Navigate makes it easy to thoroughly enjoy leisure time from an..."
//   features: []
//   images: ["https://images.barcodelookup.com/74/740547-1.jpg"]
// }
