import React, { useState } from 'react';
import { TopNav } from './topnav/topnav';
import { HamburgerMenu } from './hamburger-menu/HamburgerMenu';
import { NavigationData } from './types';
import { CustomHamburgerMenuContainer } from './HamburgerMenuContainer';
import { HamburgerMenuContainer } from './styles';

interface GlobalNavProps {
  isLoggedIn?: boolean;
  isSunday?: boolean;
  data: NavigationData;
}

export const GlobalNav = ({ isLoggedIn, isSunday, data }: GlobalNavProps) => {
  const [hamburgerActive, setHamburgerActive] = useState<boolean>(false);

  return (
    <>
      <TopNav
        isLoggedIn={isLoggedIn}
        isSunday={isSunday}
        mainMenu={data.mainMenuItems}
        accountMenu={data.accountMenuItems}
        isHamburgerOpen={hamburgerActive}
        toggleHamburger={setHamburgerActive}
      />
      <HamburgerMenuContainer
        open={hamburgerActive}
        onDismiss={() => setHamburgerActive(false)}
        closePosition="none"
        overrides={{ panel: { size: { xs: '100%', md: '322px' } } }}
      >
        <HamburgerMenu {...{ isLoggedIn, data }} />
      </HamburgerMenuContainer>
    </>
  );
};

export const GlobalNavWithCustomDrawer = ({
  isLoggedIn,
  isSunday,
  data
}: GlobalNavProps) => {
  const [hamburgerActive, setHamburgerActive] = useState<boolean>(false);
  return (
    <>
      <TopNav
        isLoggedIn={isLoggedIn}
        isSunday={isSunday}
        mainMenu={data.mainMenuItems}
        accountMenu={data.accountMenuItems}
        isHamburgerOpen={hamburgerActive}
        toggleHamburger={setHamburgerActive}
      />
      <CustomHamburgerMenuContainer
        setHamburgerActive={setHamburgerActive}
        hamburgerActive={hamburgerActive}
      >
        <HamburgerMenu {...{ isLoggedIn, data }} />
      </CustomHamburgerMenuContainer>
    </>
  );
};
