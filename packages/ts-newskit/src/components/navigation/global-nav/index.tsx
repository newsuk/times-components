import React, { useState, ReactNode } from 'react';
import { TopNav } from './topnav/topnav';
import { HamburgerMenu } from './hamburger-menu/HamburgerMenu';
import { NavigationData } from './types';
import { CustomHamburgerMenuContainer } from './HamburgerMenuContainer';
import { HamburgerMenuContainer } from './styles';
import { Drawer, useInstrumentation } from 'newskit';
import { HAMBURGER_MENU, GLOBAL_NAVIGATION } from '../constants';
import { getTopNavClickEvent } from '../analytics/ga-event';

interface GlobalNavProps {
  isLoggedIn?: boolean;
  isSunday?: boolean;
  data: NavigationData;
}

export const GlobalNav = ({ isLoggedIn, isSunday, data }: GlobalNavProps) => {
  const [hamburgerActive, setHamburgerActive] = useState<boolean>(false);
  const { fireEvent } = useInstrumentation();

  const onClickTopNavigation = (title: string, section: string) => {
    fireEvent(getTopNavClickEvent(title, section));
  };

  const hamburgerClickHandler = (title: string) => {
    onClickTopNavigation(title, HAMBURGER_MENU);
  };

  const globalNavClickHandler = (title: string) => {
    onClickTopNavigation(title, GLOBAL_NAVIGATION);
  };

  return (
    <>
      <TopNav
        isLoggedIn={isLoggedIn}
        isSunday={isSunday}
        mainMenu={data.mainMenuItems}
        accountMenu={data.accountMenuItems}
        isHamburgerOpen={hamburgerActive}
        toggleHamburger={setHamburgerActive}
        clickHandler={globalNavClickHandler}
      />
      <HamburgerMenuContainer
        isLoggedIn={isLoggedIn}
        open={hamburgerActive}
        onDismiss={() => setHamburgerActive(false)}
        closePosition="none"
        overrides={{ panel: { size: { xs: '100%', md: '322px' } } }}
      >
        <HamburgerMenu {...{ isLoggedIn, data, hamburgerClickHandler }} />
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
  const { fireEvent } = useInstrumentation();

  const onClickTopNavigation = (title: string, section: string) => {
    fireEvent(getTopNavClickEvent(title, section));
  };

  const hamburgerClickHandler = (title: string) => {
    onClickTopNavigation(title, HAMBURGER_MENU);
  };

  const globalNavClickHandler = (title: string) => {
    onClickTopNavigation(title, GLOBAL_NAVIGATION);
  };

  return (
    <>
      <TopNav
        isLoggedIn={isLoggedIn}
        isSunday={isSunday}
        mainMenu={data.mainMenuItems}
        accountMenu={data.accountMenuItems}
        isHamburgerOpen={hamburgerActive}
        toggleHamburger={setHamburgerActive}
        clickHandler={globalNavClickHandler}
      />
      <CustomHamburgerMenuContainer
        setHamburgerActive={setHamburgerActive}
        hamburgerActive={hamburgerActive}
        isLoggedIn={isLoggedIn}
      >
        <HamburgerMenu {...{ isLoggedIn, data, hamburgerClickHandler }} />
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
