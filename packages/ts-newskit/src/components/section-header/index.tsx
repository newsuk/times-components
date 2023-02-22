import React from 'react';
import { ThemeProvider, Headline } from 'newskit'
// import { SectionHeaderText } from './style'
import { TimesWebLightTheme } from '../../theme';

export const SectionHeader: React.FC<{ title: string }> = ( {title} ) => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <Headline headingAs="h1" overrides={{
        typographyPreset: 'sectionHeader010',
        heading: {
          stylePreset: 'sectionheaderText'
        }
      }}>{title}</Headline>
    </ThemeProvider>
  );
};
