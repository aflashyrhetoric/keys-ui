import React, { useState } from "react"
import { Modal } from "carbon-components-react"
import ProductCard from "src/configurator/ProductCard"
import PageContent from "templates/page-content"
import { Keyboard } from "types/keyboard"

import cStyles from "../styles/Configurator.module.scss"
import ProductModalInfo from "src/configurator/ProductModalInfo"
import UIShellPage from "templates/page-uishell"
import KeyboardParameters from "src/configurator/parameters/KeyboardParameters"
import { PickerProps } from "types/app"
import { userPreferencesToTags } from "src/shared/products"

const SwitchPicker: React.FC<PickerProps> = ({
  productsFilteredByMultipleSelect,
  products,
  navigate,
  prefs,
  setPrefs,
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
      <UIShellPage
        title="Keyboard Picker"
        navigate={navigate}
        parameters={
          <KeyboardParameters
            productsFilteredByMultipleSelect={productsFilteredByMultipleSelect}
            products={products}
            prefs={prefs}
            setPrefs={setPrefs}
          />
        }
      >
        <Modal
          open={modalOpen}
          size="lg"
          className={cStyles.modal}
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
          subtitle={userPreferencesToTags(prefs)}
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
