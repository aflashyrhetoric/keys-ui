import React, { useEffect, useState } from "react"
import { TextInput, Loading, Modal } from "carbon-components-react"
import {
  loadProductData,
  loadProductDataAdmin,
  parseObject,
  prepareFormStateForAPI,
} from "src/utils/api-helpers"
import { Keyboard } from "types/keyboard"
import Page from "templates/page"
import styles from "styles/Admin.module.scss"
import BaseTable, { EditingState } from "src/shared/BaseTable"
import AdminModalForm from "src/forms/AdminModalForm"
import APIClient from "src/api-client"

export default function Admin() {
  const [formState, setFormState] = useState<Keyboard>(null)
  const [editingMode, setEditingMode] = useState<EditingState>(
    EditingState.CREATE,
  )
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [scrapedProducts, setScrapedProducts] = useState([])
  const [products, setProducts] = useState([])

  // Updates state as well as localStorage keys
  useEffect(() => {
    const setProductData = async () => {
      const response = await loadProductDataAdmin()
      const scraped = response.scraped_data
      const products = response.products
      setScrapedProducts(scraped)
      setProducts(products)
    }

    setProductData()
  }, [])

  return (
    <Page title="Admin Page" style={{ padding: "2rem" }}>
      <Modal
        open={modalOpen}
        modalHeading="Edit Record"
        primaryButtonText="Update"
        secondaryButtonText="Cancel"
        onBlur={() => setModalOpen(false)}
        onRequestClose={() => setModalOpen(false)}
        onRequestSubmit={() => {
          const payload = prepareFormStateForAPI(formState)
          APIClient.saveNewProduct(payload)
        }}
      >
        {formState && (
          <AdminModalForm formState={formState} setFormState={setFormState} />
        )}
        <div style={{ marginBottom: "10px" }} />
      </Modal>
      <div className={styles.container}>
        {!products && <Loading active />}
        {products && (
          <BaseTable
            title="Product Data Completeness: Admin Panel"
            updateFormState={setFormState}
            updateEditingMode={setEditingMode}
            openModal={() => setModalOpen(true)}
            disableBatchEdit
            disableAddNew
            allowHeaderTextWrapping
            headerData={[
              // {
              //   header: "SKU",
              //   key: "sku",
              // },
              // {
              //   header: "Brand",
              //   key: "brand",
              // },
              {
                header: "C: Product",
                key: "COMPUTED_searchable_title", //
              },
              // {
              //   header: "Full Title",
              //   key: "full_title",
              // },
              // {
              //   header: "Name",
              //   key: "product_name",
              //   style: { width: "40px" },
              // },
              // {
              //   header: "Description",
              //   key: "product_description",
              // },
              // {
              //   header: "URL",
              //   key: "url",
              // },
              // {
              //   header: "Price",
              //   key: "price",
              // },
              {
                header: "Frame Color",
                key: "frame_color",
              },
              {
                header: "LED Color",
                key: "primary_led_color",
              },
              {
                header: "Hotswappable",
                key: "hotswappable",
              },
              {
                header: "Interfaces",
                key: "interfaces",
              },
              // {
              //   header: "Windows Compatible",
              //   key: "windows_compatible",
              //   style: { width: "30px" },
              // },
              // {
              //   header: "Mac Compatible",
              //   key: "mac_compatible",
              //   style: { width: "30px" },
              // },
              // {
              //   header: "Linux Compatible",
              //   key: "linux_compatible",
              //   style: { width: "30px" },
              // },
              {
                header: "Dimensions",
                key: "dimensions",
              },
              {
                header: "Weight",
                key: "weight",
              },
            ]}
            rawRowData={products}
            rowData={products.map(p => {
              return {
                ...p,
                id: p.full_title,
                COMPUTED_searchable_title: `${p.product_name}`,
                full_title: (
                  <p style={{ whiteSpace: "nowrap" }}>{p.full_title}</p>
                ),
              }
            })}
          />
        )}
      </div>
    </Page>
  )
}
