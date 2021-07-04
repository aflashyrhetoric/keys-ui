import React, { useState } from "react"
import { Modal } from "carbon-components-react"
import ProductCard from "src/configurator/ProductCard"
import PageContent from "templates/page-content"
import { Keyboard, KeyboardSizes } from "types/keyboard"

import { setPrefSize } from "src/store/slices/sizeSlice"
import { setPrefOS } from "src/store/slices/osSlice"
import { togglePrefInterface } from "src/store/slices/interfaceSlice"
import { setPrefFrameColor } from "src/store/slices/frameColorSlice"
import { togglePrefBacklighting } from "src/store/slices/keyboardBacklightingSlice"
import { togglePrefSwitch } from "src/store/slices/switchSlice"

import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import Chip from "@material-ui/core/Chip"

import cStyles from "../styles/Configurator.module.scss"
import ProductModalInfo from "src/configurator/ProductModalInfo"
import UIShellPage from "templates/page-uishell"
import KeyboardParameters from "src/configurator/parameters/KeyboardParameters"
import { PickerProps } from "types/app"
import { userPreferencesToTags } from "src/shared/products"
import { useDispatch } from "react-redux"

const KeyboardPicker: React.FC<PickerProps> = ({
  products,
  navigate,
  prefs,
}: PickerProps) => {
  const [highlightedProduct, setHighlightedProduct] = useState<Keyboard>(null)
  const productIsHighlighted = highlightedProduct !== null

  const [modalOpen, setModalOpen] = useState(false)

  const dispatch = useDispatch()

  const highlightedProductData = productIsHighlighted
    ? products.find(p => p.product_name === highlightedProduct.product_name)
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
            // productsFilteredByMultipleSelect={productsFilteredByMultipleSelect}
            products={products}
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
            justifyContent: "flex-start",
          }}
        >
          <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={prefs.size}
            onChange={e => dispatch(setPrefSize(e.target.value))}
            input={<Input />}
            // MenuProps={MenuProps}
          >
            {KeyboardSizes.map(keyboardSize => (
              <MenuItem
                key={keyboardSize}
                value={keyboardSize}
                // style={getStyles(name, personName, theme)}
              >
                {keyboardSize}
              </MenuItem>
            ))}
          </Select>
          <br />
          {products.length === 0 && "Select a size to get started"}
          {products &&
            products.map(p => (
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

export default KeyboardPicker
