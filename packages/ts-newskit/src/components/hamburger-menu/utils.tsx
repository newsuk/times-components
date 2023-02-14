import React from 'react';
import { Story } from '@storybook/addon-docs';
import { ThemeProvider } from 'newskit';
import { TimesWebLightTheme } from '../../theme';

export const StoryWithTheme: React.FC<{ name: string }> = ({
  name,
  children
}) => (
  <ThemeProvider theme={TimesWebLightTheme}>
    <Story name={name}>{children}</Story>
  </ThemeProvider>
);
