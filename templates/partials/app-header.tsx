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
} from "carbon-components-react"
import { View } from "types/views"

import { Search20, Notification20, AppSwitcher20 } from "@carbon/icons-react"
import SidebarSection from "./SidebarSection"
import usePreferencesStore, { localStorageKey } from "src/utils/local-storage"
import KeyboardParameters from "src/configurator/parameters/KeyboardParameters"

interface Props {
  navigate?: Function // pass-through fn to change a view somewhere in the parent (probably configurator.tsx)
  parameters: JSX.Element
}

const AppHeader: React.FC<Props> = ({ navigate, parameters }: Props) => {
  const [isSideNavExpanded, onClickSideNavExpand] = useState(false)
  const [prefs, setPrefs] = usePreferencesStore(localStorageKey, {})
  const action = () => {}

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Mosu Header">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="">
              Mosu
            </HeaderName>
            <HeaderNavigation aria-label="[Adelie] Mosu">
              <HeaderMenuItem href="/quiz">Return to Quiz</HeaderMenuItem>
              <HeaderMenuItem href="/admin">Admin Panel</HeaderMenuItem>
              {/* <HeaderMenu aria-label="Link 2" menuLinkName="Link 2">
                <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
              </HeaderMenu> */}
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
              {/* <HeaderGlobalAction
                aria-label="App Switcher"
                onClick={action("app-switcher click")}
                tooltipAlignment="end"
              >
                <AppSwitcher20 />
              </HeaderGlobalAction> */}
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
                  key="base keyboard"
                  label="base keyboard"
                  tooltipText="This will be your base keyboard. The majority of keyboards come pre-assembled with a starter set of switches and keycaps"
                  navigate={() => navigate(View.KeyboardPicker)}
                >
                  <div className={styles.addKeyboard}> + Add Keyboard</div>
                </SidebarSection>
                <SidebarSection
                  listContent
                  key="extra switches"
                  label="extra switches"
                  tooltipText="If you have a hot-swappable keyboard, you can change the switches. Click to explore available switch variations"
                  navigate={() => navigate(View.SwitchPicker)}
                >
                  <ul>
                    <li key="example">Holy Pandas: Yellow</li>
                  </ul>
                </SidebarSection>
                <SidebarSection
                  listContent
                  key="extra keycaps"
                  label="extra keycaps"
                  tooltipText="Browse according to colorway, profile (aka shape of the keycaps), materials, and more"
                  navigate={() => navigate(View.KeycapPicker)}
                >
                  <ul>
                    <li>Holy Pandas: Yellow</li>
                  </ul>
                </SidebarSection>
                <hr
                  style={{
                    border: "3px solid black",
                    margin: "1rem",
                  }}
                />
                <KeyboardParameters />
                {/* <SideNavLink renderIcon={Fade16} href="#">
                  Link
                </SideNavLink> */}
              </SideNavItems>
            </SideNav>

            {parameters && (
              <HeaderPanel aria-label="Header Panel" expanded>
                <div>
                  <h1>NO PARAMETERS</h1>
                </div>
              </HeaderPanel>
            )}
          </Header>
        </>
      )}
    />
  )
}

export default AppHeader
