import React from 'react';
import { ThemeProvider } from 'newskit'
import { SectionHeaderTitle } from './SectionHeaderTitle';

import { TimesWebLightTheme } from '../../theme';

export const SectionHeader: React.FC<{ title: string }> = ( title ) => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
        <SectionHeaderTitle title={title} />
    </ThemeProvider>
  );
};
