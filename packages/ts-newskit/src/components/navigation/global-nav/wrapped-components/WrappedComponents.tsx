import React from 'react';
import { GlobalNav } from '..';
import { HamburgerMenu } from '../hamburger-menu/HamburgerMenu';
import { NavigationData } from '../types';
import { HAMBURGER_MENU, GLOBAL_NAVIGATION } from '../../constants';

export const WrappedGlobalNav: React.FC<{
  data: NavigationData;
  clickHandler: (title: string, section: string) => void;
}> = ({ data, clickHandler }) => {
  const hamburgerClickHandler = (title: string) => {
    clickHandler(title, GLOBAL_NAVIGATION);
  };
  return <GlobalNav data={data} clickHandler={hamburgerClickHandler} />;
};

export const WrappedHamburger: React.FC<{
  data: NavigationData;
  isLoggedIn: boolean;
  clickHandler: (title: string, section: string) => void;
}> = ({ data, isLoggedIn, clickHandler }) => {
  const hamburgerClickHandler = (title: string) => {
    clickHandler(title, HAMBURGER_MENU);
  };
  return (
    <HamburgerMenu
      isLoggedIn={isLoggedIn}
      data={data}
      hamburgerClickHandler={hamburgerClickHandler}
    />
  );
};
