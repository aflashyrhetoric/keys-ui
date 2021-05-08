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
          <Header aria-label="Adelie Keys Header">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="Adelie">
              :: Keys
            </HeaderName>
            <HeaderNavigation aria-label="[Adelie] Keys">
              <HeaderMenuItem href="/quiz">Return to Quiz</HeaderMenuItem>
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
                {/* <SideNavLink renderIcon={Fade16} href="#">
                  Link
                </SideNavLink> */}
              </SideNavItems>
            </SideNav>
            <HeaderPanel aria-label="Header Panel" expanded>
              {parameters || (
                <div>
                  <h1>NO PARAMETERS</h1>
                </div>
              )}
            </HeaderPanel>
          </Header>
        </>
      )}
    />
  )
}

export default AppHeader
