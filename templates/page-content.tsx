import styles from "styles/UIShell.module.scss"

interface PageProps {
  title: string
  subtitle?: any
  style: any
  children: any
}

const PageContent = ({ title, subtitle, style, children }: PageProps) => {
  return (
    <div className={styles.content}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1>{title} </h1>
        <hr className={styles.headerDivider} />
        <span>{subtitle}</span>
      </div>
      <div style={style}>{children}</div>
    </div>
  )
}

export default PageContent
