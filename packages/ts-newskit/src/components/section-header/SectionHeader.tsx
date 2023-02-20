import React from 'react';
import { ThemeProvider, TextBlock } from 'newskit'

import { SectionHeaderTitle } from './style'
import { TimesWebLightTheme } from '../../theme';
import { SectionTitleItems } from './types';

export const SectionHeader: React.FC<{
  data: SectionTitleItems[];
}> = ({ data }) => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      {data.map(item => (
        <SectionHeaderTitle>
          <TextBlock
            as="span"
            typographyPreset="sectionTitle010"
          >
            {item.title}
          </TextBlock>
        </SectionHeaderTitle>
      ))}
    </ThemeProvider>
  );
};
