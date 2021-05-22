import { postData } from "./utils/api-client"
import { PRODUCT_DATA_ENDPOINT } from "./utils/api-helpers"

export default class APIClient {
  static async saveNewProduct(product) {
    postData(`${PRODUCT_DATA_ENDPOINT}/products`, { product })
  }
}
