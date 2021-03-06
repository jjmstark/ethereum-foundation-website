import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "gatsby"

import Footer from "./Footer"

import "./layout.css"
import EFLogo from "../images/ethereum-logo.svg"
import HomeLogo from "../images/ethereum-foundation-logo.svg"
import { screenSizeS } from "../utils/styles"

const Image = styled(motion.img)`
  position: fixed;
  z-index: 20;
  top: 20px;
  left: 40px;
`

const StyledLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TopLayout = styled(motion.div)`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`

const BottomLayout = styled.div`
  position: absolute;
  z-index: 20;
  bottom: 0;
  width: 100%;
`

const Main = styled(motion.main)`
  position: relative;
  z-index: 20;
`

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 1.0,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
}

const SubpageNav = () => (
  <motion.nav variants={variants} initial="initial" animate="enter" exit="exit">
    <Link to="/">
      <Image
        src={EFLogo}
        alt="Ethereum Logo"
        whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
      />
    </Link>
  </motion.nav>
)

const Logo = styled(motion.img)`
  position: absolute;
  z-index: 20;
  top: calc(50% - 53px); /* 106px / 2 */
  left: calc(50% - 120px); /* 240px / 2 */
  transform: translate(-50, -55%);
  min-width: 240px;

  @media (max-width: ${screenSizeS}) {
    left: calc(50% - 110px);
  }
`

const Layout = ({ children, path }) => {
  const [layoutState, setLayoutState] = useState({
    isFooterOpen: false,
  })

  useEffect(() => {
    setLayoutState({
      isFooterOpen: layoutState.isFooterOpen,
      clientWidth: document.documentElement.clientWidth,
    })
  }, [layoutState.isFooterOpen])

  const footerShiftY = layoutState.clientWidth < 780 ? -380 : -186

  return (
    <StyledLayout>
      <TopLayout
        variants={{ normal: { y: 0 }, open: { y: footerShiftY } }}
        transition={{ duration: 0.8 }}
        initial="normal"
        animate={layoutState.isFooterOpen ? "open" : "normal"}
      >
        <AnimatePresence>
          {path === "/" && (
            <Logo
              src={HomeLogo}
              alt="Ethereum Foundation Logo"
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>{path !== "/" && <SubpageNav />}</AnimatePresence>

        {/* TODO this is triggering UI "jumps" on constellation */}
        {/* Move contellation into the wrapPageElement? */}
        <AnimatePresence>
          <Main
            key={path}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {children}
          </Main>
        </AnimatePresence>
      </TopLayout>
      <BottomLayout>
        <Footer
          isOpen={layoutState.isFooterOpen}
          clientWidth={layoutState.clientWidth}
          setLayoutState={setLayoutState}
        />
      </BottomLayout>
    </StyledLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
