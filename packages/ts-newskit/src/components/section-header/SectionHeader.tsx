import React from 'react';
import { ThemeProvider, TextBlock } from 'newskit'

import { SectionHeaderTitle } from './style'
import { TimesWebLightTheme } from '../../theme';

export const SectionHeader: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <SectionHeaderTitle>
        <TextBlock
          as="span"
          typographyPreset="sectionTitle010"
        >
          News
        </TextBlock>
      </SectionHeaderTitle>
    </ThemeProvider>
  );
};