import React from 'react';
import { ThemeProvider } from 'newskit';

import { TimesWebLightTheme } from '../../theme';

import { TopNav } from './top-nav';


export const GlobalNav: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
        <TopNav />
    </ThemeProvider>
  );
};
