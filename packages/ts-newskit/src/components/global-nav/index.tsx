import React from 'react';
import { NewsKitProvider } from 'newskit';
import TopNav from './TopNav';

import { TimesWebLightTheme } from '../../theme';

const GlobalNav = () => {
  return (
    <NewsKitProvider theme={TimesWebLightTheme}>
        <TopNav />
    </NewsKitProvider>
  );
};

export default GlobalNav;