import React, { useState } from "react"
import { Tooltip } from "carbon-components-react"
import { Information16 } from "@carbon/icons-react"
import classnames from "classnames"
import styles from "./app-header.module.scss"

interface Props {
  label: string
  tooltipText: string
  large?: boolean
  listContent?: boolean
  children: any
}

const SidebarSection: React.FC<Props> = ({
  label,
  tooltipText,
  large = false,
  listContent = false,
  children,
}: Props) => {
  return (
    <div
      className={classnames(
        styles.SideNavLink,
        large && styles.SideNavLinkLarge,
      )}
    >
      <div className={styles.sidebarHeading}>
        <div>
          <span className={styles.sidebarHeadingText}>{label}</span>
          <div className={styles.tooltipWrapper}>
            {tooltipText !== "" && (
              <Tooltip
                className={styles.Tooltip}
                align="start"
                direction="right"
                renderIcon={Information16}
              >
                {tooltipText}
              </Tooltip>
            )}
          </div>
        </div>
        <div>
          <span>Change</span>
        </div>
      </div>
      {listContent ? (
        <div style={{ paddingLeft: "1.4rem" }}>{children}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

export default SidebarSection
