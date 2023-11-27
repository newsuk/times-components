import React from 'react';
import { GlobalNav } from '..';
import { HamburgerMenu } from '../hamburger-menu/HamburgerMenu';
import { NavigationData } from '../types';

export const WrappedGlobalNav: React.FC<{
  data: NavigationData;
  clickHandler: (title: string) => void;
}> = ({ data, clickHandler }) => (
  <GlobalNav data={data} clickHandler={clickHandler} />
);

export const WrappedHamburger: React.FC<{
  data: NavigationData;
  isLoggedIn: boolean;
  clickHandler: (title: string) => void;
}> = ({ data, isLoggedIn, clickHandler }) => (
  <HamburgerMenu
    isLoggedIn={isLoggedIn}
    data={data}
    clickHandler={clickHandler}
  />
);
