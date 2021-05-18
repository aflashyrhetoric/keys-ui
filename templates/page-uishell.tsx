import Head from "next/head"
import styles from "styles/UIShell.module.scss"
import { Button } from "carbon-components-react";
import { LogoTwitter24 } from "@carbon/icons-react"
import AppHeader from "./partials/app-header"
import { UserPreferences } from "types/app"
import { loadProductData } from "src/utils/api-helpers"
interface PageProps {
  title?: string
  navigate?: Function // a function that changes a view in the parent
  children: any
  parameters?: JSX.Element
}

const UIShellPage = ({ title, navigate, children, parameters }: PageProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title ? `Keys | ${title}` : "Keys"}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
        />
        <link
          rel="stylesheet"
          href="//unpkg.com/carbon-components/css/carbon-components.css"
        />
      </Head>

      <main className={styles.main}>
        <AppHeader navigate={navigate} parameters={parameters} />
        {children}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/aflashyrhetoric"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <LogoTwitter24 />
          @aflashyrhetoric */}
          <div style={{ display: "flex" }}>
            <Button
              kind="secondary"
              onClick={() => {
                loadProductData()
              }}
            >
              Refresh Product Data
            </Button>
          </div>
        </a>
        <a href="https://kevinoh.me" target="_blank" rel="noopener noreferrer">
          ko
        </a>
      </footer>
    </div>
  )
}

export default UIShellPage
