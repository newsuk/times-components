import React from 'react';
import LoggedInMenuItem from './LoggedInMenuItem';
import { HamburgerStyledMenu } from '../styles';

const NavButtonSection: React.FC<{
  setSelected: (title: string) => void;
  selected: string;
  clickHandler: (title: string) => void;
}> = ({ setSelected, selected, clickHandler }) => (
  <HamburgerStyledMenu role="region" aria-label="Navigation Menu">
    <LoggedInMenuItem
      title="Sections"
      setSelected={setSelected}
      selected={selected}
      clickHandler={clickHandler}
    />
    <LoggedInMenuItem
      title="My account"
      setSelected={setSelected}
      selected={selected}
      clickHandler={clickHandler}
    />
  </HamburgerStyledMenu>
);

export default NavButtonSection;
