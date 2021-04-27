import React, { MouseEventHandler, useState } from "react"
import { imgPath } from "src/utils/products"
import { Keyboard } from "types/keyboard"
import styles from "./ProductCard.module.scss"

interface Props {
  product: Keyboard
  onClick: MouseEventHandler<HTMLDivElement>
}

const ProductCard: React.FC<Props> = ({ product, onClick }: Props) => {
  const {
    brand,
    size,
    img_path,
    full_title,
    product_name,
    interfaces,
    price,
  } = product

  const imgSrc = imgPath(img_path)

  return (
    <div className={styles.ProductCard} onClick={onClick}>
      <div className={styles.productImageWrapper}>
        <img src={imgSrc} alt={`${brand} ${product_name}`} />
      </div>
      <div className={styles.productDetails}>
        <span className={styles.productBrand}>{brand}</span>
        <span className={styles.productTitle}>{product_name}</span>
        <div className={styles.productPrice}>{price}</div>
      </div>
    </div>
  )
}

export default ProductCard
