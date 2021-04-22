import Page from "templates/page"
import styles from "../styles/Home.module.css"
import Link from "next/link"

export default function Home() {
  return (
    <Page>
      <h1 className={styles.title}>keys v1.0a</h1>
      <br />
      <br />

      <div className={styles.grid}>
        <Link href="/quiz">
          <div className={styles.card}>
            <h3>Quiz &rarr;</h3>
            <p>Answer some questions, get some recommendations.</p>
          </div>
        </Link>
        <Link href="/configurator">
          <div className={styles.card}>
            <h3>Configurator</h3>
            <p>
              Already a keeb weeb? Jump into our setup configurator to create
              setups.
            </p>
          </div>
        </Link>
      </div>
    </Page>
  )
}
