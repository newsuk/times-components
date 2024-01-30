// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

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
