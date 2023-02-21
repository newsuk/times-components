import React from 'react';
import { ThemeProvider } from 'newskit'
import { SectionHeaderName } from './SectionHeader';

import { TimesWebLightTheme } from '../../theme';

export const SectionHeader: React.FC<{ title: string }> = ( {title} ) => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <SectionHeaderName title={title} />
    </ThemeProvider>
  );
};
