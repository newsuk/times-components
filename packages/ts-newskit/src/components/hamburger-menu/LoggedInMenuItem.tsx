// @ts-nocheck
import React from 'react';
import { MenuItem, TextBlock } from 'newskit';


const LoggedInMenuItem: React.FC<{}> = ({ title, navItems, navigationData, handleClick }) => (
  <MenuItem selected={navigationData === navItems} overrides={{ stylePreset: 'menuState' }} onClick={handleClick}>
    <TextBlock style={{ fontSize: '15px'}}>{title}</TextBlock>
  </MenuItem>
);

export default LoggedInMenuItem;