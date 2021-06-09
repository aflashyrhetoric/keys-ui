import React, { useState } from "react"
import Page from "templates/page"
import styles from "../styles/Home.module.scss"
import Button from "@material-ui/core/Button"
import classnames from "classnames"

import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

export default function Home() {
  const [schoolExpanded, setSchoolExpanded] = useState(false)
  const [schoolIndex, setSchoolIndex] = useState(0)

  // const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
  //   setValue(newValue)
  // }

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
                Explore keyboards & switches.
                <br />
                Create and share keyboard builds.
              </h2>
            </div>

            <div className={styles.heroButtons}>
              <Button
                variant="contained"
                color="primary"
                className="heroButton"
              >
                New? Take our quiz
              </Button>
              <Button className="heroButton" style={{ color: "white" }}>
                Or, create a build
              </Button>
            </div>
          </div>

          <div className={styles.heroImage}>
            <img src="/assets/hero-image.png" alt="" />
          </div>
        </div>
        <section>
          <p className={styles.bodyText}>
            filter keyboards by size, color. filter switches by type,{" "}
          </p>
        </section>

        <section>
          <div
            className={classnames(
              styles.school,
              schoolExpanded && styles.expanded,
            )}
          >
            <h2>The Basics</h2>
            <p>
              <Button onClick={() => setSchoolExpanded(!schoolExpanded)}>
                start here
              </Button>
            </p>

            <div style={{ marginBottom: "10px" }} />

            <Paper square>
              <Tabs
                value={schoolIndex}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, v) => setSchoolIndex(v)}
                aria-label="disabled tabs example"
              >
                <Tab label="Active" />
                <Tab label="Disabled" />
                <Tab label="Active" />
              </Tabs>

              {schoolIndex === 0 && <p>Chicken</p>}
              {schoolIndex === 0 && <p>Chicken</p>}
            </Paper>
          </div>
        </section>
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
