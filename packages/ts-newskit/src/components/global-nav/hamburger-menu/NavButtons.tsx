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
  handleClick: (title: string) => void;
  selected: string;
}> = ({ handleClick, selected }) => (
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
        handleClick={handleClick}
        selected={selected}
      />
      <LoggedInMenuItem
        title="My account"
        handleClick={handleClick}
        selected={selected}
      />
    </HamburgerStyledMenu>
  </>
);

const NavButtonSection: React.FC<{
  loggedIn?: boolean;
  handleClick: (title: string) => void;
  selected: string;
}> = ({ loggedIn, handleClick, selected }) =>
  loggedIn ? (
    <LoggedInNavButtons handleClick={handleClick} selected={selected} />
  ) : (
    <LoggedOutNavButtons />
  );

export default NavButtonSection;
