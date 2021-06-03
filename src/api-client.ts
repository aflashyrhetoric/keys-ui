import { deleteData, patchData, postData } from "./utils/api-client"
import { PRODUCT_DATA_ENDPOINT } from "./utils/api-helpers"

export default class APIClient {
  static async saveNewProduct(product) {
    postData(`${PRODUCT_DATA_ENDPOINT}/products`, { product })
  }
  static async updateProduct(sku, product) {
    patchData(`${PRODUCT_DATA_ENDPOINT}/products/${sku}`, { product })
  }
  static async deleteProduct(id) {
    deleteData(`${PRODUCT_DATA_ENDPOINT}/products/${id}`)
  }
}
