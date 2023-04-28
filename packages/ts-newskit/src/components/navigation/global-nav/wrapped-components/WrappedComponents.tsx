import React from 'react';
import { TCThemeProvider } from '../../../../utils';
import { GlobalNav } from '..';
import { HamburgerMenu } from '../hamburger-menu/HamburgerMenu';
import { NavigationData } from '../types';

export const WrappedGlobalNav: React.FC<{ data: NavigationData }> = ({
  data
}) => (
  <TCThemeProvider>
    <GlobalNav data={data} />
  </TCThemeProvider>
);

export const WrappedHamburger: React.FC<{
  data: NavigationData;
  isLoggedIn: boolean;
}> = ({ data, isLoggedIn }) => (
  <TCThemeProvider>
    <HamburgerMenu isLoggedIn={isLoggedIn} data={data} />
  </TCThemeProvider>
);
