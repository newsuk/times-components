import React from 'react';
import { ThemeProvider } from 'newskit'
import { SectionHeaderTitle } from './SectionHeaderTitle';

import { TimesWebLightTheme } from '../../theme';

export const SectionHeader = () => {
  const props = { title: "News" };

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
        <SectionHeaderTitle {...props} />
    </ThemeProvider>
  );
};
