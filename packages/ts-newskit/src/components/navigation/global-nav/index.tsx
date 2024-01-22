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
  clickHandler: (title: string) => void;
  onClick?: (isHamburgerOpen: boolean) => void;
}

export const GlobalNav = ({
  isLoggedIn,
  isSunday,
  data,
  onClick
}: GlobalNavProps) => {
  const [hamburgerActive, setHamburgerActive] = useState<boolean>(false);
  const { fireEvent } = useInstrumentation();

  const onClickTopNavigation = (title: string, section: string) => {
    fireEvent(getTopNavClickEvent(title, section));
  };

  return (
    <>
      <TopNav
        isLoggedIn={isLoggedIn}
        isSunday={isSunday}
        mainMenu={data.mainMenuItems}
        accountMenu={data.accountMenuItems}
        isHamburgerOpen={hamburgerActive}
        toggleHamburger={isHamburgerOpen => {
          onClick && onClick(isHamburgerOpen);
          setHamburgerActive(isHamburgerOpen);
        }}
        clickHandler={(title: string) =>
          onClickTopNavigation(title, GLOBAL_NAVIGATION)
        }
      />
      <HamburgerMenuContainer
        isLoggedIn={isLoggedIn}
        open={hamburgerActive}
        onDismiss={() => setHamburgerActive(false)}
        closePosition="none"
        overrides={{
          panel: {
            size: { xs: '100%', md: '322px' },
            transitionPreset: {
              xs: {
                extend: 'fade',
                base: {
                  transitionDelay: '{{motions.motionDuration000}}',
                  transitionDuration: '{{motions.motionDuration020}}'
                }
              },
              md: 'slideLeft'
            }
          },
          overlay: {
            stylePreset: 'menuOverlay'
          }
        }}
      >
        <HamburgerMenu
          {...{ isLoggedIn, data }}
          hamburgerClickHandler={(title: string) =>
            onClickTopNavigation(title, HAMBURGER_MENU)
          }
        />
      </HamburgerMenuContainer>
    </>
  );
};

export const GlobalNavWithCustomDrawer = ({
  isLoggedIn,
  isSunday,
  data,
  onClick
}: GlobalNavProps) => {
  const [hamburgerActive, setHamburgerActive] = useState<boolean>(false);
  const { fireEvent } = useInstrumentation();

  const onClickTopNavigation = (title: string, section: string) => {
    fireEvent(getTopNavClickEvent(title, section));
  };

  return (
    <>
      <TopNav
        isLoggedIn={isLoggedIn}
        isSunday={isSunday}
        mainMenu={data.mainMenuItems}
        accountMenu={data.accountMenuItems}
        isHamburgerOpen={hamburgerActive}
        toggleHamburger={isHamburgerOpen => {
          onClick && onClick(isHamburgerOpen);
          setHamburgerActive(isHamburgerOpen);
        }}
        clickHandler={title => onClickTopNavigation(title, GLOBAL_NAVIGATION)}
      />
      <CustomHamburgerMenuContainer
        setHamburgerActive={setHamburgerActive}
        hamburgerActive={hamburgerActive}
        isLoggedIn={isLoggedIn}
      >
        <HamburgerMenu
          {...{ isLoggedIn, data }}
          hamburgerClickHandler={title =>
            onClickTopNavigation(title, HAMBURGER_MENU)
          }
        />
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
