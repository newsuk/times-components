import React from 'react';
import { NewsKitProvider, Theme } from 'newskit';
import { TimesWebLightTheme, TimesWebLightSportTheme } from '../theme';

type TCThemeProviderProps = {
  theme?: Theme;
};

export const themes = {
  TimesWebLightTheme,
  TimesWebLightSportTheme
};

export const TCThemeProvider: React.FC<TCThemeProviderProps> = ({
  theme = TimesWebLightTheme,
  children
}) => <NewsKitProvider theme={theme}>{children}</NewsKitProvider>;
