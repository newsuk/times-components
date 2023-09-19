import React from 'react';
import { GlobalNav } from '..';
import { HamburgerMenu } from '../hamburger-menu/HamburgerMenu';
import { NavigationData } from '../types';

export const WrappedGlobalNav: React.FC<{ data: NavigationData }> = ({
  data
}) => <GlobalNav data={data} />;

export const WrappedHamburger: React.FC<{
  data: NavigationData;
  isLoggedIn: boolean;
}> = ({ data, isLoggedIn }) => (
  <HamburgerMenu isLoggedIn={isLoggedIn} data={data} />
);
