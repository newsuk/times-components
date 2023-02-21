import React from 'react';
import { ThemeProvider } from 'newskit'

import { SectionHeader } from './style'
import { TimesWebLightTheme } from '../../theme';

export const SectionHeaderTitle: React.FC<{ title: string }> = () => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <SectionHeader />
    </ThemeProvider>
  );
};