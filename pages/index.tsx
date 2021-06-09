import Page from "templates/page"
import styles from "../styles/Home.module.scss"
import Link from "next/link"

export default function Home() {
  return (
    <Page>
      <div className={styles.pageHome}>
        <div className={styles.hero}>
          <div className={styles.heroInformation}>
            <div>
              <h1>
                <span className={styles.heroAccent}>mosu</span>
              </h1>
              <h2>
                Create and share builds
                <br />
                Explore new releases.
              </h2>
            </div>

            <div className={styles.heroButtons}>
              <button className="heroButton">New? Take our quiz</button>
              <button className="heroButton">Or, create a build</button>
            </div>
          </div>

          <div className={styles.heroImage}>
            <img src="/assets/hero-image.png" alt="" />
          </div>
          {/* <h1 className={styles.title}>mosu v1.0a</h1> */}
        </div>
      </div>

      {/* <div className={styles.grid}>
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
      </div> */}
    </Page>
  )
}
