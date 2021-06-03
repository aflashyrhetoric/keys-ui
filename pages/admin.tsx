import React, { useEffect, useState } from "react"
import {
  ContentSwitcher,
  Switch,
  Toggle,
  Loading,
  Modal,
} from "carbon-components-react"
import { Checkmark20, Incomplete20 } from "@carbon/icons-react"
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
import APIClient from "src/api-client"
import ScrapedDataForm from "src/forms/ScrapedDataForm"
import VerifiedDataForm from "src/forms/VerifiedDataForm"
import AdminPalette from "src/shared/AdminPalette"

enum AdminView {
  ScrapedData = "Scraped Data",
  VerifiedData = "VerifiedData",
}

// enum EditingMode {
//   Verification = "Verification",
//   Update = "Update",
// }

export default function Admin() {
  const [formState, setFormState] = useState<Keyboard>(null)
  const [editingMode, setEditingMode] = useState<EditingState>(
    EditingState.CREATE,
  )
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [scrapedProducts, setScrapedProducts] = useState([])

  const [filterScrapedProductsOnly, setFilterScrapedProductsOnly] =
    useState(true) // For scraped products only

  const [products, setProducts] = useState([])
  const [activeView, setActiveView] = useState(AdminView.ScrapedData)

  const setProductData = async () => {
    const response = await loadProductDataAdmin()
    const { data } = response
    console.log(data)
    const scraped =
      data.scraped_data?.length > 0 ? JSON.parse(data.scraped_data) : []
    const products = data.products || []

    setScrapedProducts(scraped)
    setProducts(products)
  }

  // Updates state as well as localStorage keys
  useEffect(() => {
    setProductData()
  }, [])

  const resetForm = () => {
    setFormState(null)
  }

  const verifiedProducts = new Set(
    products.map((product: Keyboard) => product.sku),
  )

  const productIsVerified = p => verifiedProducts.has(p)
  const isScrapedView = activeView === AdminView.ScrapedData
  const scrapedViewProductSet = filterScrapedProductsOnly
    ? scrapedProducts.filter(p => !productIsVerified(p.sku))
    : scrapedProducts

  return (
    <Page title="Admin Page" style={{ padding: "2rem" }}>
      <h4>Admin Dashboard</h4>
      <div style={{ marginBottom: "10px" }} />
      <AdminPalette />
      <Modal
        modalHeading="Delete ID"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        open={deleteModalOpen}
        danger
        onBlur={() => {
          setDeleteModalOpen(false)
          resetForm()
        }}
        onRequestClose={() => {
          setDeleteModalOpen(false)
          resetForm()
        }}
        onRequestSubmit={async () => {
          await APIClient.deleteProduct(formState.id)
          setDeleteModalOpen(false)
        }}
      >
        Delete this record?
      </Modal>
      <Modal
        open={modalOpen}
        modalHeading={
          isScrapedView ? "Fill out data to verify product" : "Update product"
        }
        primaryButtonText={isScrapedView ? "Save" : "Update"}
        secondaryButtonText="Cancel"
        onBlur={() => {
          setModalOpen(false)
          resetForm()
        }}
        primaryButtonDisabled={
          (productIsVerified(formState?.sku) && isScrapedView) || false
        }
        onRequestClose={() => {
          setModalOpen(false)
          resetForm()
        }}
        onRequestSubmit={async () => {
          const payload = prepareFormStateForAPI(formState)
          // console.log(formState, "becomes", payload)
          if (isScrapedView) {
            await APIClient.saveNewProduct(payload)
          } else {
            await APIClient.updateProduct(payload.sku, payload)
          }

          loadProductData()
          setModalOpen(false)
        }}
      >
        {formState && (
          <>
            {isScrapedView && (
              <ScrapedDataForm
                formState={formState}
                setFormState={setFormState}
              />
            )}
            {activeView === AdminView.VerifiedData && (
              <VerifiedDataForm
                formState={parseObject(formState)}
                setFormState={setFormState}
              />
            )}
          </>
        )}
        <div style={{ marginBottom: "10px" }} />
      </Modal>
      <div className={styles.container}>
        <ContentSwitcher onChange={() => {}}>
          <Switch
            name="Scraped"
            text="Scraped Data"
            onClick={() => setActiveView(AdminView.ScrapedData)}
          />
          <Switch
            name="Verified Data"
            text="Verified Data"
            onClick={() => setActiveView(AdminView.VerifiedData)}
          />
        </ContentSwitcher>
        <div style={{ marginBottom: "10px" }} />
        <Toggle
          id="toggle-view-set"
          labelText="Show remaining products only"
          toggled={filterScrapedProductsOnly}
          onChange={() =>
            setFilterScrapedProductsOnly(!filterScrapedProductsOnly)
          }
        />
        <div style={{ marginBottom: "30px" }} />
        {!scrapedProducts && <Loading active />}
        {isScrapedView && scrapedProducts && (
          <BaseTable
            title="Scraped Data: Admin Panel"
            updateFormState={setFormState}
            updateEditingMode={setEditingMode}
            openModal={() => setModalOpen(true)}
            disableBatchEdit
            disableAddNew
            disableOverflowDelete
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
                header: "Verified?",
                key: "verified",
              },
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
            rawRowData={scrapedViewProductSet}
            rowData={scrapedViewProductSet.map(p => {
              return {
                ...p,
                id: p.full_title,
                verified: productIsVerified(p.sku) ? (
                  <Checkmark20 />
                ) : (
                  <Incomplete20 />
                ),
                COMPUTED_searchable_title: `${p.product_name}`,
                full_title: (
                  <p style={{ whiteSpace: "nowrap" }}>{p.full_title}</p>
                ),
              }
            })}
          />
        )}
        {activeView === AdminView.VerifiedData && scrapedProducts && (
          <BaseTable
            title="Verified Data: Admin Panel"
            updateFormState={setFormState}
            updateEditingMode={setEditingMode}
            openModal={() => setModalOpen(true)}
            disableBatchEdit
            disableAddNew
            allowHeaderTextWrapping
            openDeleteModal={() => setDeleteModalOpen(true)}
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
                key: "COMPUTED_interfaces",
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
              const product = parseObject(p)
              return {
                ...product,
                id: product.full_title,
                COMPUTED_interfaces: `${
                  product.interfaces && Array.isArray(product.interfaces)
                    ? product.interfaces.join(", ")
                    : []
                }`,
                COMPUTED_searchable_title: `${product.product_name}`,
                full_title: (
                  <p style={{ whiteSpace: "nowrap" }}>{product.full_title}</p>
                ),
              }
            })}
          />
        )}
      </div>
    </Page>
  )
}
