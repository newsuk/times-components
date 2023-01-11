import React from 'react';
import { ThemeProvider, TextBlock } from 'newskit';

import { TimesWebLightTheme } from '../../theme';

import { NavigationContainer } from './styles';

export const Navigation: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <NavigationContainer>
        <TextBlock
          as="p"
          typographyPreset={{
            xs: 'editorialParagraph020',
            md: 'editorialParagraph030'
          }}
          stylePreset={'articleParagraph'}
        >
          Hello this is the navigation component
        </TextBlock>
      </NavigationContainer>
    </ThemeProvider>
  );
};
