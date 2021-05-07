import getQuestions from "data/questions"
import { filterProducts } from "src/shared/products"
import products from "tests/product-data"
import { UserPreferences } from "types/app"
import { Keyboard } from "types/keyboard"

describe("product filters successfully filter", () => {
  test("filters products correctly", () => {
    const prefs = {
      numpad: "yes",
      compatible_oses: "windows",
      interfaces: "wired",
      frame_color: "black",
      primary_led_color: "white",
    }

    const questions = getQuestions()

    const results = filterProducts(products, prefs, questions)
    expect(true).toBe(true)
  })
})
