import React from 'react';
import { Block } from 'newskit';
import LoggedInMenuItem from './LoggedInMenuItem';
import SearchBar from './SearchBar';
import { StyledMenu } from './styles';
import mainNavItems from './fixtures/menu-items.json';
import accountItems from './fixtures/account-items.json';
import LoggedOutNavButton from './LoggedOutNavButton';

export const LoggedOutNavButtons = () => (
  <>
  <Block paddingInline='space040' paddingBlock="space030" style={{backgroundColor: '#1D1D1B'}}>
  <div style={{ display: 'flex'}}>
      <LoggedOutNavButton preset="buttonSolidSecondary" title="Log in"></LoggedOutNavButton>
      <div style={{margin: "4px"}}></div>
      <LoggedOutNavButton preset="buttonSolidPrimary" title="Subscribe"></LoggedOutNavButton>
    </div>
    </Block>
    <Block marginInline={'space040'} marginBlock={'space040'}>
      <SearchBar />
    </Block>
    </>
);

export const LoggedInNavButtons: React.FC<{ handleClickMain: Function, handleClickAccount: Function, selected: string}> = ({ handleClickMain, handleClickAccount, selected }) => 
  (
  <>
  <Block paddingInline="space040" marginBlock={'space040'}>
      <SearchBar />
    </Block>
    <StyledMenu>
      <LoggedInMenuItem navItems={mainNavItems} title="Sections" handleClick={handleClickMain}  selected={selected}/>
      <LoggedInMenuItem navItems={accountItems} title="My account" handleClick={handleClickAccount} selected={selected}/>
    </StyledMenu>
  </>
)


const NavButtonSection: React.FC<{ loggedIn: boolean, handleClickMain: Function, handleClickAccount: Function, selected: string}> = ({ loggedIn, handleClickMain, handleClickAccount, selected }) => {
  return (
    loggedIn ? (
      <LoggedInNavButtons handleClickMain={handleClickMain} handleClickAccount={handleClickAccount} selected={selected}/>
    ) : (
      <LoggedOutNavButtons />
    )
  )};

export default NavButtonSection;