import Head from "next/head"
import styles from "../styles/Home.module.css"
import Link from "next/link"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{/* project:mk */}</h1>

        <p className={styles.description}>
          project:mk
          <br />
          v0.1a
        </p>

        <div className={styles.grid}>
          <Link href="/quiz/s">
            <h3>Take the quiz &rarr;</h3>
            <p>
              Personalized recommendations to help you find products that
              complement your workflow and aesthetic.
            </p>
          </Link>

          <a
            href="https://nextjs.org/docs"
            className={styles.card}
            style={{ opacity: 0.5 }}
          >
            <h3>(COMING SOON) Keyboard Configurator &rarr;</h3>
            <p>
              <strong>Already a pro?</strong> Create a build with the
              configurator.
            </p>
          </a>
        </div>
      </main>

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
