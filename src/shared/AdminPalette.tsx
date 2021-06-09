import React, { useState } from "react"
import { Button, Loading } from "carbon-components-react"
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
  const [loading, setLoading] = useState(false)

  return (
    <div className={styles.adminPalette}>
      <Loading small withOverlay active={loading} />
      <h4>admin palette</h4>
      <div>
        <Button
          kind="secondary"
          onClick={async () => {
            setLoading(true)
            await cacheScrapedProductData(14)
            setLoading(false)
          }}
        >
          Cache scraped data (Zyte -&gt; Redis)
        </Button>
        <Button
          kind="secondary"
          onClick={async () => {
            setLoading(true)
            await cacheVerifiedProductData()
            setLoading(false)
          }}
        >
          Cache verified data (Postgres -&gt; Redis)
        </Button>
      </div>
    </div>
  )
}

export default AdminPalette
