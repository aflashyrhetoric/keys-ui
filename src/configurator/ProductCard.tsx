import React, { useState } from "react"
import { Keyboard } from "types/keyboard"
import styles from "./ProductCard.module.scss"

interface Props {
  product: Keyboard
  onClick: Function
}

const ProductCard: React.FC<Props> = ({ product, onClick }: Props) => {
  const { brand, size, full_title, product_name, interfaces, price } = product

  return (
    <div className={styles.ProductCard} onClick={onClick}>
      <div className={styles.productImageWrapper}></div>
      <div className={styles.productDetails}>
        <span className={styles.productBrand}>{brand}</span>
        <span className={styles.productTitle}>{product_name}</span>
        <div className={styles.productPrice}>{price}</div>
        {/* {size} */}
        {/* {full_title} */}
        {/* {product_name} */}
        {/* {interfaces} */}
        {/* {price} */}
      </div>
    </div>
  )
}

export default ProductCard
