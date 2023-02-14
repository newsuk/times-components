import React from 'react';
import { Block } from 'newskit';
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
    >
      <div style={{ display: 'flex' }}>
        <LoggedOutNavButton preset="buttonSolidSecondary" title="Log in" />
        <div style={{ margin: '4px' }} />
        <LoggedOutNavButton preset="buttonSolidPrimary" title="Subscribe" />
      </div>
    </Block>
    <Block marginInline={'space040'} marginBlock={'space040'}>
      <SearchBar />
    </Block>
  </>
);

export const LoggedInNavButtons: React.FC<{
  handleClick: Function;
  selected: string;
}> = ({ handleClick, selected }) => (
  <>
    <Block paddingInline="space040" marginBlock={'space040'}>
      <SearchBar />
    </Block>
    <StyledMenu>
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
  handleClick: Function;
  selected: string;
}> = ({ loggedIn, handleClick, selected }) =>
  loggedIn ? (
    <LoggedInNavButtons handleClick={handleClick} selected={selected} />
  ) : (
    <LoggedOutNavButtons />
  );

export default NavButtonSection;
