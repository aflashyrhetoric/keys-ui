import React, { useState } from "react"
import { Modal } from "carbon-components-react"
import ProductCard from "src/configurator/ProductCard"
import PageContent from "templates/page-content"
import { Keyboard } from "types/keyboard"

import cStyles from "../styles/Configurator.module.scss"
import ProductModalInfo from "src/configurator/ProductModalInfo"
import UIShellPage from "templates/page-uishell"
import { PickerProps } from "types/app"

const SwitchPicker: React.FC<PickerProps> = ({
  products,
  navigate,
  prefs,
}: PickerProps) => {
  const [highlightedProduct, setHighlightedProduct] = useState<Keyboard>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const productIsHighlighted = highlightedProduct !== null

  const highlightedProductData = productIsHighlighted
    ? products.find((p) => p.product_name === highlightedProduct.product_name)
    : null

  const resetState = () => {
    setHighlightedProduct(null)
    setModalOpen(false)
  }

  return (
    <>
      <UIShellPage title="Switch Picker" navigate={navigate}>
        <Modal
          open={modalOpen}
          size="lg"
          className={cStyles.modal}
          primaryButtonText="Add Switch to Current Build "
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
          title="switch picker"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
          }}
        >
          {products &&
            products.map((p) => (
              <ProductCard
                key={p.full_title}
                product={p}
                onClick={() => {
                  setHighlightedProduct(p)
                  setModalOpen(true)
                }}
              />
            ))}
        </PageContent>
      </UIShellPage>
    </>
  )
}

export default SwitchPicker
