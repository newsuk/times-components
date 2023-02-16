import React from 'react';
import { Block, Stack } from 'newskit';
import LoggedInMenuItem from './LoggedInMenuItem';
import SearchBar from './SearchBar';
import { StyledMenu } from './styles';
import LoggedOutNavButton from './LoggedOutNavButton';

export const LoggedOutNavButtons = () => (
  <>
    <Block
      paddingInline="space040"
      paddingBlock="space030"
      style={{ backgroundColor: '#1D1D1B' }}
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
      marginInline={'space040'}
      marginBlock={'space040'}
    >
      <SearchBar />
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
      marginBlock={'space040'}
      role="region"
      aria-label="Search Bar"
    >
      <SearchBar />
    </Block>
    <StyledMenu role="region" aria-label="Navigation Menu">
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
    </StyledMenu>
  </>
);

const NavButtonSection: React.FC<{
  loggedIn: boolean;
  handleClick: (title: string) => void;
  selected: string;
}> = ({ loggedIn, handleClick, selected }) =>
  loggedIn ? (
    <LoggedInNavButtons handleClick={handleClick} selected={selected} />
  ) : (
    <LoggedOutNavButtons />
  );

export default NavButtonSection;
