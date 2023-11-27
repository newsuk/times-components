import React, { useState, ReactNode } from 'react';
import { TopNav } from './topnav/topnav';
import { HamburgerMenu } from './hamburger-menu/HamburgerMenu';
import { NavigationData } from './types';
import { CustomHamburgerMenuContainer } from './HamburgerMenuContainer';
import { HamburgerMenuContainer } from './styles';
import { Drawer } from 'newskit';

interface GlobalNavProps {
  isLoggedIn?: boolean;
  isSunday?: boolean;
  data: NavigationData;
  clickHandler: (title: string) => void;
}

export const GlobalNav = ({
  isLoggedIn,
  isSunday,
  data,
  clickHandler
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
        clickHandler={clickHandler}
      />
      <HamburgerMenuContainer
        isLoggedIn={isLoggedIn}
        open={hamburgerActive}
        onDismiss={() => setHamburgerActive(false)}
        closePosition="none"
        overrides={{ panel: { size: { xs: '100%', md: '322px' } } }}
      >
        <HamburgerMenu {...{ isLoggedIn, data, clickHandler }} />
      </HamburgerMenuContainer>
    </>
  );
};

export const GlobalNavWithCustomDrawer = ({
  isLoggedIn,
  isSunday,
  data,
  clickHandler
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
        clickHandler={clickHandler}
      />
      <CustomHamburgerMenuContainer
        setHamburgerActive={setHamburgerActive}
        hamburgerActive={hamburgerActive}
        isLoggedIn={isLoggedIn}
      >
        <HamburgerMenu {...{ isLoggedIn, data, clickHandler }} />
      </CustomHamburgerMenuContainer>
    </>
  );
};

export const TSNewskitDrawer: React.FC<{
  children: ReactNode;
  open: boolean;
  onDismiss: () => void;
}> = ({ children, open, onDismiss }) => {
  return (
    <Drawer onDismiss={onDismiss} open={open}>
      {children}
    </Drawer>
  );
};
