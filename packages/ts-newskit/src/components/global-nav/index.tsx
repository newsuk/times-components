import React from 'react';
import TopNav from './topnav';

type GlobalNavProps = {
  isLoggedIn?: boolean;
};

const GlobalNav: React.FC<GlobalNavProps> = ({ isLoggedIn }) => {
  return <TopNav isLoggedIn={isLoggedIn} />;
};

export default GlobalNav;
