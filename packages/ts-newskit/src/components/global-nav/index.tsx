import React from 'react';
import { NewsKitProvider } from 'newskit';
import { TopNav } from './top-nav';

import { TimesWebLightTheme } from '../../theme';

export const GlobalNav = () => {
  return (
    <NewsKitProvider theme={TimesWebLightTheme}>
        <TopNav />
    </NewsKitProvider>
  );
};