import React from 'react';
import LoggedInMenuItem from './LoggedInMenuItem';
import { HamburgerStyledMenu } from '../styles';

const NavButtonSection: React.FC<{
  setSelected: (title: string) => void;
  selected: string;
}> = ({ setSelected, selected }) => (
  <HamburgerStyledMenu role="region" aria-label="Navigation Menu">
    <LoggedInMenuItem
      title="Sections"
      setSelected={setSelected}
      selected={selected}
    />
    <LoggedInMenuItem
      title="My account"
      setSelected={setSelected}
      selected={selected}
    />
  </HamburgerStyledMenu>
);

export default NavButtonSection;
