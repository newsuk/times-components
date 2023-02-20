import React from 'react';
import { ThemeProvider } from 'newskit'
import { SectionHeader } from './SectionHeader';

import { TimesWebLightTheme } from '../../theme';
import { SectionTitleItems } from './types';
import { sectionTitles } from './fixtures/sectiontitle-items.json';

export const SectionHeaderTitle: React.FC<{
  data: SectionTitleItems[];
}> = () => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
        <SectionHeader data={sectionTitles} />
    </ThemeProvider>
  );
};
