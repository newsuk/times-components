import React from 'react';
import { ThemeProvider } from 'newskit'
import { SectionHeaderTitle } from './SectionHeader';

import { TimesWebLightTheme } from '../../theme';

export const SectionHeader = () => {
  const props = { sectionTitle: "News" };

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
        <SectionHeaderTitle {...props} />
    </ThemeProvider>
  );
};
