// @ts-nocheck
import React from 'react';
import { Button, Block } from 'newskit';
import LoggedInMenuItem from './LoggedInMenuItem';
import SearchBar from './SearchBar';
import { StyledMenu } from './styles';
import mainNavItems from './fixtures/menu-items.json';
import accountItems from './fixtures/account-items.json';
import LoggedOutNavButton from './LoggedOutNavButton';

export const LoggedOutNavButtons = () => (
    <>
    <div style={{display: 'flex'}}>
      <LoggedOutNavButton size="small" preset="buttonSolidSecondary" title="Log in"></LoggedOutNavButton>
      <div style={{margin: '4px'}}></div>
      <LoggedOutNavButton size="small" preset="buttonSolidPrimary" title="Subscribe"></LoggedOutNavButton>
      </div>
      <Block marginBlock={'space030'}>
      <SearchBar />
    </Block>
      </>
);

export const LoggedInNavButtons = ({ handleClickMain, handleClickAccount, navigationData }) => (
  <>
    <SearchBar/>
    <StyledMenu>
      <LoggedInMenuItem navItems={mainNavItems} title="Sections" handleClick={handleClickMain} navigationData={navigationData} />
      <LoggedInMenuItem navItems={accountItems} title="Account" handleClick={handleClickAccount} navigationData={navigationData} />
      </StyledMenu>
    </>
)


const NavButtonSection: React.FC<{}> = ({ loggedIn, handleClickMain, handleClickAccount, navigationData }) => {
 return (
  loggedIn ? (
    <LoggedInNavButtons handleClickMain={handleClickMain} handleClickAccount={handleClickAccount} navigationData={navigationData}/>
  ) : (
    <LoggedOutNavButtons />
  )
)};

export default NavButtonSection;