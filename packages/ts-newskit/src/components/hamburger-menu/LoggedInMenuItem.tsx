import React from 'react';
import { MenuItem, TextBlock } from 'newskit';
import { NavigationData } from './types';


const LoggedInMenuItem: React.FC<{ title: string, navItems: NavigationData, handleClick: Function, selected: string}> = ({ title, handleClick, selected }) => {
  return (
  <MenuItem selected={selected === title} overrides={{ stylePreset: 'menuState' }} onClick={handleClick}>
    <TextBlock style={{ fontSize: '15px'}}>{title}</TextBlock>
  </MenuItem>
)};

export default LoggedInMenuItem;