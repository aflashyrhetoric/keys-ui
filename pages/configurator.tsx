import React, { useEffect, useState } from "react"
import { Modal } from "carbon-components-react"
import { CircleLoader } from "react-spinners"
// import styles from "../styles/Home.module.css"
// import cStyles from "../styles/Configurator.module.scss"

import Questions, {
  getQuestionFromKey,
  preferenceKeyToString,
  Question,
} from "data/questions"
import UIShellPage from "templates/page-uishell"
import ProductCard from "src/configurator/ProductCard"
import MultipleChoiceQuestion from "src/quiz/MultipleChoice"
import { loadProductData } from "src/utils/api-helpers"
import { Keyboard } from "types/keyboard"
import PageContent from "templates/page-content"
import ProductModalInfo from "src/configurator/ProductModalInfo"

export default function Configurator() {
  // const [phase, setPhase] = useState<QuizPhase>(QuizPhase.NotBegun)
  // const [userPrefs, setUserPrefs] = useState<any>({})
  // const [questionIndex, setQuestionIndex] = useState(0)
  const [products, setProducts] = useState<Keyboard[]>([])
  const [highlightedProduct, setHighlightedProduct] = useState<Keyboard>(null)
  const [productModalIsOpen, setProductModalIsOpen] = useState(false)

  const questions: Question[] = Questions()

  useEffect(() => {
    const setProductData = async () => {
      const response = await loadProductData()
      const rawData = response.data
      console.log(JSON.parse(rawData))
      setProducts(JSON.parse(rawData))
    }

    setProductData()
  }, [])

  const productIsHighlighted = highlightedProduct !== null

  const highlightedProductData = productIsHighlighted
    ? products.find(p => p.product_name === highlightedProduct.product_name)
    : null

  console.log(highlightedProductData)

  const resetState = () => {
    setHighlightedProduct(null)
    setProductModalIsOpen(false)
  }

  return (
    <UIShellPage title="Configurator">
      <Modal
        open={productModalIsOpen}
        size="lg"
        primaryButtonText="Set as Base Keyboard"
        secondaryButtonText="Cancel"
        onRequestSubmit={() =>
          console.log(`saved ${highlightedProductData.product_name}`)
        }
        onRequestClose={resetState}
      >
        {highlightedProductData && (
          <ProductModalInfo product={highlightedProductData} />
        )}
      </Modal>
      <PageContent
        title="keyboard picker"
        subtitle={
          <p>
            Currently filtering for red-frame keyboards with clicky switches and
            wireless connectivity
          </p>
        }
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-around",
        }}
      >
        {products &&
          products.map(p => (
            <ProductCard
              product={p}
              onClick={() => {
                setHighlightedProduct(p)
                setProductModalIsOpen(true)
              }}
            />
          ))}
      </PageContent>
    </UIShellPage>
  )
}
