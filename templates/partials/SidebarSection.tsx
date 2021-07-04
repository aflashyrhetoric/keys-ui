import React, { useState } from "react"
import { Button, Tooltip } from "carbon-components-react"
import { Information16 } from "@carbon/icons-react"
import classnames from "classnames"
import styles from "./app-header.module.scss"

interface Props {
  label: string
  tooltipText: string
  large?: boolean
  listContent?: boolean
  children: any
  navigate?: Function
  showTooltipLeft?: boolean

  style?: any
}

const SidebarSection: React.FC<Props> = ({
  label,
  tooltipText,
  large = false,
  listContent = false,
  children,
  navigate,
  showTooltipLeft = false,
  style = {},
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
                align={showTooltipLeft ? "end" : "start"}
                direction={showTooltipLeft ? "bottom" : "right"}
                renderIcon={Information16}
              >
                {tooltipText}
              </Tooltip>
            )}
          </div>
        </div>
        <div>
          {navigate !== undefined && (
            <Button kind="ghost" size="sm" onClick={() => navigate()}>
              Change
            </Button>
          )}
        </div>
      </div>
      {listContent ? (
        <div style={{ ...style, paddingLeft: "1rem" }}>{children}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

export default SidebarSection
