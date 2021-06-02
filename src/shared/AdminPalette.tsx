import React, { useState } from "react"
import { Button } from "carbon-components-react"
import {
  cacheScrapedProductData,
  cacheVerifiedProductData,
  loadProductData,
} from "src/utils/api-helpers"
import styles from "./styles.module.scss"

interface Props {
  something?: string
}

const AdminPalette: React.FC<Props> = (props: Props) => {
  // const [something, setSomething] = useState(props.something);

  return (
    <div className={styles.adminPalette}>
      <h4>admin palette</h4>
      <div>
        <Button
          kind="secondary"
          onClick={() => {
            cacheScrapedProductData(11)
          }}
        >
          Cache scraped data
        </Button>
        <Button
          kind="secondary"
          onClick={() => {
            cacheVerifiedProductData()
          }}
        >
          Cache verified data
        </Button>
      </div>
    </div>
  )
}

export default AdminPalette
