import React from 'react';
import { ThemeProvider, MenuItem } from 'newskit';
import { TimesWebLightTheme } from '../../theme';
import { MenuDivider, MainMenu } from './styles';
import { SecondaryMenuItem } from './types';

export const SecondaryNavDesktop: React.FC<{ data: SecondaryMenuItem[] }> = ({
  data
}) => {
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <MainMenu
        aria-label="Secondary Navigation"
        overrides={{ spaceInline: 'space000' }}
        align="center"
      >
        {data.map(item => (
          <MenuItem
            overrides={{ stylePreset: 'menuItemDesktop' }}
            href={`/${item.slug}`}
          >
            {item.title}
          </MenuItem>
        ))}
      </MainMenu>
      <MenuDivider />
    </ThemeProvider>
  );
};
