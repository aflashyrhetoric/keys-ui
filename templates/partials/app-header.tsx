import React, { useState } from "react"
import styles from "./app-header.module.scss"
import {
  Header,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderMenu,
  HeaderMenuItem,
  HeaderNavigation,
  HeaderName,
  HeaderPanel,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  Tooltip,
} from "carbon-components-react"
import { View } from "types/views"

import {
  Search20,
  Notification20,
  AppSwitcher20,
  Fade16,
  Information16,
} from "@carbon/icons-react"
import SidebarSection from "./SidebarSection"

interface Props {
  navigate?: Function // pass-through fn to change a view somewhere in the parent (probably configurator.tsx)
}

const AppHeader: React.FC<Props> = ({ navigate }: Props) => {
  const [isSideNavExpanded, onClickSideNavExpand] = useState(false)
  const action = () => {}

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="IBM Platform Name">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="IBM">
              [Platform]
            </HeaderName>
            <HeaderNavigation aria-label="IBM [Platform]">
              <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
              <HeaderMenu aria-label="Link 2" menuLinkName="Link 2">
                <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
              </HeaderMenu>
            </HeaderNavigation>
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Search"
                onClick={action("search click")}
              >
                <Search20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Notifications"
                onClick={action("notification click")}
              >
                <Notification20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="App Switcher"
                onClick={action("app-switcher click")}
                tooltipAlignment="end"
              >
                <AppSwitcher20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideNav
              className={styles.SideNav}
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
            >
              <SideNavItems>
                <HeaderSideNavItems hasDivider={true}>
                  <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                  <HeaderMenu aria-label="Link 2" menuLinkName="Link 2">
                    <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  </HeaderMenu>
                </HeaderSideNavItems>
                <SidebarSection
                  large
                  label="base keyboard"
                  tooltipText="This will be your base keyboard. The majority of keyboards come pre-assembled with a starter set of switches and keycaps"
                  navigate={() => navigate(View.KeyboardPicker)}
                >
                  <div className={styles.addKeyboard}> + Add Keyboard</div>
                </SidebarSection>
                <SidebarSection
                  listContent
                  label="extra switches"
                  tooltipText="If you have a hot-swappable keyboard, you can change the switches. Click to explore available switch variations"
                  navigate={() => navigate(View.SwitchPicker)}
                >
                  <ul>
                    <li>Holy Pandas: Yellow</li>
                  </ul>
                </SidebarSection>
                <SidebarSection
                  listContent
                  label="extra keycaps"
                  tooltipText="Browse according to colorway, profile (aka shape of the keycaps), materials, and more"
                  navigate={() => navigate(View.KeycapPicker)}
                >
                  <ul>
                    <li>Holy Pandas: Yellow</li>
                  </ul>
                </SidebarSection>
                <SideNavLink renderIcon={Fade16} href="#">
                  Link
                </SideNavLink>
              </SideNavItems>
            </SideNav>
            <HeaderPanel aria-label="Header Panel" expanded />
          </Header>
        </>
      )}
    />
  )
}

export default AppHeader
