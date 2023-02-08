// @ts-nocheck
import React from 'react';
import { MenuItem } from 'newskit';

const LoggedInMenuItem: React.FC<{}> = ({ title, navItems, navigationData, handleClick }) => (
  <MenuItem selected={navigationData === navItems} overrides={{ stylePreset: 'menuState'}} onClick={handleClick}>{title}</MenuItem>
);

export default LoggedInMenuItem;