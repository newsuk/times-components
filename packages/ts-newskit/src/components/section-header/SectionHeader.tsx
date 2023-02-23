import React from 'react';
import { ThemeProvider, TextBlock } from 'newskit'

import { SectionHeader } from './style'
import { TimesWebLightTheme } from '../../theme';

export const SectionHeaderTitle: React.FC<{ sectionTitle: string }> = ( sectionTitle ) => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <SectionHeader>
        <TextBlock
          as="span"
          typographyPreset="sectionTitle010"
        >
          {sectionTitle}
        </TextBlock>
      </SectionHeader>
    </ThemeProvider>
  );
};