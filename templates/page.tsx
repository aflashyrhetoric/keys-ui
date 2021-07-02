import React, { useMemo } from "react"
import Head from "next/head"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import store from "src/store"
import { Provider } from "react-redux"
import { LogoTwitter24 } from "@carbon/icons-react"
// import { purple } from "@material-ui/core/colors"

import styles from "styles/Home.module.scss"

interface PageProps {
  title?: string
  children: any
  style?: any
}

const Page = ({ title, children, style = {} }: PageProps) => {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  })
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
          secondary: {
            light: "#6d6d6d",
            main: "#424242",
            dark: "#1b1b1b",
            contrastText: "#fff",
          },
          primary: {
            light: "#8a8aff",
            main: "#4b5dff",
            dark: "#0033cb",
            contrastText: "#fff",
          },
        },
      }),
    [],
  )

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

      <ThemeProvider theme={theme}>
        {/* <Provider store={store}> */}
        <main className={styles.main}>{children}</main>
        {/* </Provider> */}
      </ThemeProvider>

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
