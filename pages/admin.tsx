import React, { useEffect, useState } from "react"
import { TextInput, Loading, Modal } from "carbon-components-react"
import { loadNullProductData } from "src/utils/api-helpers"
import { Keyboard } from "types/keyboard"
import Page from "templates/page"
import styles from "styles/Admin.module.scss"
import BaseTable, { EditingState } from "src/shared/BaseTable"

export default function Admin() {
  const [formState, setFormState] = useState<Keyboard>({} as Keyboard)
  const [editingMode, setEditingMode] = useState<EditingState>(
    EditingState.CREATE,
  )
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [products, setProducts] = useState([])

  // Updates state as well as localStorage keys
  useEffect(() => {
    const setProductData = async () => {
      const response = await loadNullProductData()
      const products = response.data
      setProducts(products)
    }

    setProductData()
  }, [])

  return (
    <Page title="Admin Page">
      <Modal
        open={modalOpen}
        modalHeading="Edit Record"
        primaryButtonText="Update"
        secondaryButtonText="Cancel"
        onBlur={() => setModalOpen(false)}
        onRequestClose={() => setModalOpen(false)}
        onRequestSubmit={() => {}}
      >
        <TextInput labelText="Brand" value={formState.brand} />
        <TextInput labelText="Product Name" value={formState.product_name} />
        <TextInput labelText="Dimensions" value={formState.dimensions} />
        <TextInput labelText="Frame Color" value={formState.frame_color} />
        <TextInput labelText="Full Title" value={formState.full_title} />
        <div style={{ marginBottom: "10px" }} />
      </Modal>
      <div className={styles.container}>
        {!products && <Loading active />}
        {products && (
          <BaseTable
            title="Product Data Completeness: Admin Panel"
            updateFormState={setFormState}
            updateEditingMode={setEditingMode}
            openModal={setModalOpen}
            headerData={[
              {
                header: "Brand",
                key: "brand",
              },
              // {
              //   header: "Full Title",
              //   key: "full_title",
              // },
              {
                header: "Name",
                key: "product_name",
              },
              // {
              //   header: "Description",
              //   key: "product_description",
              // },
              {
                header: "URL",
                key: "url",
              },
              {
                header: "Price",
                key: "price",
              },
              {
                header: "Color",
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
              {
                header: "Windows Compatible",
                key: "windows_compatible",
              },
              {
                header: "Mac Compatible",
                key: "mac_compatible",
              },
              {
                header: "Linux Compatible",
                key: "linux_compatible",
              },
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
