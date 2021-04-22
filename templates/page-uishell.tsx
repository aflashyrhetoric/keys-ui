import Head from "next/head"
import styles from "styles/Home.module.css"
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
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  HeaderSideNavItems,
} from "carbon-components-react"
import {
  Search20,
  Notification20,
  AppSwitcher20,
  Fade16,
  LogoTwitter24,
} from "@carbon/icons-react"

interface PageProps {
  title?: string
  children: any
}

const UIShellPage = ({ title, children }: PageProps) => {
  const action = () => {}
  return (
    <div className={styles.container}>
      <Head>
        <title>{title ? `Keys | ${title}` : "Keys"}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
        />
        <link
          rel="stylesheet"
          href="//unpkg.com/carbon-components/css/carbon-components.css"
        />
      </Head>

      <main className={styles.main}>
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
                  <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                  <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                    <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
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
                  aria-label="Side navigation"
                  expanded={isSideNavExpanded}
                >
                  <SideNavItems>
                    <HeaderSideNavItems hasDivider={true}>
                      <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                      <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                      <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                      <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                        <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                        <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                        <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                      </HeaderMenu>
                    </HeaderSideNavItems>
                    <SideNavMenu renderIcon={Fade16} title="Category title">
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                    </SideNavMenu>
                    <SideNavMenu renderIcon={Fade16} title="Category title">
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                    </SideNavMenu>
                    <SideNavMenu
                      renderIcon={Fade16}
                      title="Category title"
                      isActive={true}
                    >
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem
                        aria-current="page"
                        href="javascript:void(0)"
                      >
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                    </SideNavMenu>
                    <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                      Link
                    </SideNavLink>
                    <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                      Link
                    </SideNavLink>
                  </SideNavItems>
                </SideNav>
                <HeaderPanel aria-label="Header Panel" expanded />
              </Header>
            </>
          )}
        />
        {children}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/aflashyrhetoric"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoTwitter24 />
          @aflashyrhetoric
        </a>
        <a href="https://kevinoh.me" target="_blank" rel="noopener noreferrer">
          ko
        </a>
      </footer>
    </div>
  )
}

export default UIShellPage
