import React from 'react';
import { TopNav } from './topnav';

type GlobalNavProps = {
  isLoggedIn?: boolean;
};

export const GlobalNav: React.FC<GlobalNavProps> = ({ isLoggedIn }) => {
  return <TopNav isLoggedIn={isLoggedIn} />;
};
