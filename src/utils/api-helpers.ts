// import

const PRODUCT_DATA_ENDPOINT = "http://localhost:3210"

export const loadProductData = async () =>
  fetch(`${PRODUCT_DATA_ENDPOINT}/fetch_product_data`).then(r => r.json())
