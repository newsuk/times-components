import React from 'react';
import { NewsKitProvider, Theme } from 'newskit';
import { TimesWebLightTheme } from '../../theme';

type TCThemeProviderProps = {
  theme?: Theme;
};

export const TCThemeProvider: React.FC<TCThemeProviderProps> = ({
  theme = TimesWebLightTheme,
  children
}) => <NewsKitProvider theme={theme}>{children}</NewsKitProvider>;
