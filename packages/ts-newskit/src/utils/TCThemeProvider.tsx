import React from 'react';
import { NewsKitProvider, Theme } from 'newskit';
import * as themes from '../theme';

type TCThemeProviderProps = {
  theme?: Theme;
};

export const TimesWebThemes = themes;

export const TCThemeProvider: React.FC<TCThemeProviderProps> = ({
  theme = themes.TimesWebLightTheme,
  children,
}) => <NewsKitProvider theme={theme}>{children}</NewsKitProvider>;
