import React, { useState } from 'react';
import { ThemeProvider } from 'newskit';
import { HamburgerMenu } from './HamburgerMenu';
import { NavButton } from './styles';
import { NewsKitBurger } from './icons';

import { TimesWebLightTheme } from '../../theme';

export const FullHamburgerMenu: React.FC<{}> = ({ loggedIn }) => {
  const [navbarVisibility, setNavbarVisibility] = useState(false)
  const handleOpen = () => {
    setNavbarVisibility(true)
  }

  const handleClose = () => {
    setNavbarVisibility(false)
  };

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
    <NavButton onClick={handleOpen} className={`navButton ${navbarVisibility ? " hideButton" : " "}`}>
        <NewsKitBurger />
      </NavButton>
      <HamburgerMenu loggedIn={loggedIn} handleClose={handleClose} navbarVisibility={navbarVisibility}/>
    </ThemeProvider>
  )
}