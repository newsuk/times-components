import React, { useState } from 'react';
import { TopNav } from './topnav/topnav';
import HamburgerMenu from './hamburger-menu/HamburgerMenu';
import { NavigationData } from './types';
import { HamburgerMenuContainer } from './styles';

type GlobalNavProps = {
  isLoggedIn?: boolean;
  isSunday?: boolean;
  data: NavigationData;
};

export const GlobalNav: React.FC<GlobalNavProps> = ({
  isLoggedIn,
  isSunday,
  data
}) => {
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
