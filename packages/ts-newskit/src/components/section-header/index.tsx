import React from 'react';
import { ThemeProvider } from 'newskit'
import { SectionHeader } from './SectionHeader';

import { TimesWebLightTheme } from '../../theme';

export const SectionHeaderTitle: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
        <SectionHeader />
    </ThemeProvider>
  );
};