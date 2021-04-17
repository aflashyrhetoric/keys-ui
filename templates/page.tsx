import Head from "next/head"
import styles from "styles/Home.module.css"

const Page = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
        />

        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"
        /> */}
        <link rel="stylesheet" href="//unpkg.com/carbon-components/css/carbon-components.css" />
      </Head>

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Page
