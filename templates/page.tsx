import Head from "next/head"
import styles from "styles/Home.module.css"
import { LogoTwitter24 } from "@carbon/icons-react"

interface PageProps {
  title?: string
  children: any
  style: any
}

const Page = ({ title, children, style = {} }: PageProps) => {
  return (
    <div className={styles.container} style={style}>
      <Head>
        <title>{title ? `Mosu | ${title}` : "Mosu"}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
        />
        <link
          rel="stylesheet"
          href="//unpkg.com/carbon-components/css/carbon-components.css"
        />
      </Head>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/aflashyrhetoric"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoTwitter24 />
          @aflashyrhetoric
        </a>
        <a href="https://kevinoh.me" target="_blank" rel="noopener noreferrer">
          ko
        </a>
      </footer>
    </div>
  )
}

export default Page
