import React from 'react';
import { ThemeProvider } from 'newskit'
import { SectionHeaderText } from './style'
import { TimesWebLightTheme } from '../../theme';

export const SectionHeader: React.FC<{ title: string }> = ( {title} ) => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <SectionHeaderText>{title}</SectionHeaderText>
    </ThemeProvider>
  );
};
