import React from 'react';
import { Block, Stack } from 'newskit';
import LoggedInMenuItem from './LoggedInMenuItem';
import { HamburgerStyledMenu } from '../styles';
import LoggedOutNavButton from './LoggedOutNavButton';
import NavSearch from '../search';

export const LoggedOutNavButtons = () => (
  <>
    <Block
      paddingInline="space040"
      paddingBlock="space030"
      stylePreset="loggedOutMenu"
      role="region"
      aria-label="Navigation Menu"
    >
      <Stack flow="horizontal-top">
        <LoggedOutNavButton preset="buttonSolidSecondary" title="Log in" />
        <Block marginInline="space010" />
        <LoggedOutNavButton preset="buttonSolidPrimary" title="Subscribe" />
      </Stack>
    </Block>
    <Block
      role="region"
      aria-label="Search Bar"
      marginInline="space040"
      marginBlock="space040"
    >
      <NavSearch isHamburger />
    </Block>
  </>
);

export const LoggedInNavButtons: React.FC<{
  setSelected: (title: string) => void;
  selected: string;
}> = ({ setSelected, selected }) => (
  <>
    <Block
      paddingInline="space040"
      marginBlock="space040"
      role="region"
      aria-label="Search Bar"
    >
      <NavSearch isHamburger />
    </Block>
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
  </>
);

const NavButtonSection: React.FC<{
  loggedIn?: boolean;
  setSelected: (title: string) => void;
  selected: string;
}> = ({ loggedIn, setSelected, selected }) =>
  loggedIn ? (
    <LoggedInNavButtons setSelected={setSelected} selected={selected} />
  ) : (
    <LoggedOutNavButtons />
  );

export default NavButtonSection;
