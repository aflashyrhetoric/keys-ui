import React, { MouseEventHandler, useState } from "react"
import { Keyboard } from "types/keyboard"
import styles from "./ProductModalInfo.module.scss"

interface Props {
  product: Keyboard
}

const ProductModalInfo: React.FC<Props> = ({ product }: Props) => {
  const { brand, size, full_title, product_name, interfaces, price } = product

  return (
    <div className={styles.ProductModalInfo}>
      <div className={styles.productImageWrapper}></div>
      <div className={styles.productDetails}>
        <span className={styles.productBrand}>{brand}</span>
        <span className={styles.productTitle}>{product_name}</span>
        <div className={styles.productPrice}>{price}</div>
      </div>
    </div>
  )
}

export default ProductModalInfo
