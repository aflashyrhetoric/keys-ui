import React, { useState } from "react"
import { Button, UnorderedList, ListItem } from "carbon-components-react"
import { Keyboard } from "types/keyboard"
import styles from "./ProductModalInfo.module.scss"
import { imgPath } from "src/utils/products"

interface Props {
  product: Keyboard
}

const ProductModalInfo: React.FC<Props> = ({ product }: Props) => {
  const {
    brand,
    size,
    frame_color,
    full_title,
    features,
    product_description,
    product_name,
    img_path,
    interfaces,
    url,
    price,
  } = product

  const imgSrc = imgPath(img_path)

  return (
    <div className={styles.ProductModalInfo}>
      <div className={styles.productImageWrapper}>
        <img src={imgSrc} alt={`${brand} ${product_name} keyboard`} />
      </div>
      <div className={styles.productDetails}>
        <span className={styles.productBrand}>{brand} </span>
        <span className={styles.productTitle}>
          {product_name} ({frame_color})
        </span>
        <div className={styles.productPrice}>{price}</div>
        <div className={styles.productFeatures}>
          <UnorderedList>
            {features.map((feature) => (
              <ListItem>{feature}</ListItem>
            ))}
          </UnorderedList>
        </div>

        <div className={styles.productDescription}>
          <p>{product_description}</p>
        </div>
        <a href={url} target="_blank" rel="noopener">
          <Button kind="ghost" className={styles.productLink}>
            View on MechanicalKeyboards.com
          </Button>
        </a>
      </div>
    </div>
  )
}

export default ProductModalInfo
